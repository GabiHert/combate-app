import { BluetoothApp } from "../../../src/cmd/bluetoothapp/bluetooth-app";
import { CombateApp } from "../../../src/cmd/combateapp/combate-app";
import { Validator } from "../../../src/cmd/formvalidator/form-validator";
import { PBluetoothApp } from "../../../src/cmd/port/bluetooth-app-port";
import { PCombateApp } from "../../../src/cmd/port/combate-app-port";
import { PValidator } from "../../../src/cmd/port/validator-port";
import { ABluetooth } from "../../../src/internal/adapter/bluetooth/bluetooth";
import { AConfigCache } from "../../../src/internal/adapter/cache/config-cache";
import { APreExecutionConfigCache } from "../../../src/internal/adapter/cache/pre-execution-config-cache";
import { AFileSystem } from "../../../src/internal/adapter/filesystem/file-system";
import { ALogger } from "../../../src/internal/adapter/logger/logger-adapter";
import { AAsyncStorage } from "../../../src/internal/adapter/repository/async-storage-adapter";
import {
  DEFAULT_CONFIG,
  DEFAULT_PRE_EXECUTION_CONFIG,
} from "../../../src/internal/config/config";
import { CheckSumBuilder } from "../../../src/internal/core/builder/check-sum-builder";
import { CbServiceFactory } from "../../../src/internal/core/factory/cb-service-factory";
import { RequestFactory } from "../../../src/internal/core/factory/request-factory";
import { ResponseDtoParser } from "../../../src/internal/core/parser/response-dto-parser";
import { PCache } from "../../../src/internal/core/port/cache-port";
import { PErrorHandlerService } from "../../../src/internal/core/port/error-handler-service-port";
import { PLogger } from "../../../src/internal/core/port/logger-port";
import { ProtocolRules } from "../../../src/internal/core/rules/protocol-rules";
import { CsvTableService } from "../../../src/internal/core/service/csv-table-service";
import { ErrorHandlerService } from "../../../src/internal/core/service/error-handler-service";
import {
  IConfigsProps,
  IPreExecutionConfigProps,
} from "../../../src/internal/interface/config-props";

export class Instance {
  readonly logger: PLogger;
  readonly combateApp: PCombateApp;
  readonly configCache: PCache<IConfigsProps>;
  readonly bluetoothApp: PBluetoothApp;
  readonly validator: PValidator;
  readonly preExecutionConfigCache: PCache<IPreExecutionConfigProps>;
  readonly errorHandler: PErrorHandlerService;
  private _connectedDeviceId: string;

  getConnectedDeviceId(): string {
    return this._connectedDeviceId;
  }

  setConnectedDeviceId(id: string) {
    this._connectedDeviceId = id;
  }

  private static _instance: Instance;
  static GetInstance(): Instance {
    if (!this._instance) this._instance = new Instance();
    return this._instance;
  }

  private constructor() {
    this.logger = new ALogger(true);

    const bluetooth = new ABluetooth(this.logger);
    const fileSystem = new AFileSystem(this.logger);
    const csvTableService = new CsvTableService(this.logger, fileSystem);
    const checkSumBuilder = new CheckSumBuilder(this.logger);
    const protocolRules = new ProtocolRules(this.logger, checkSumBuilder);
    const responseDtoParser = new ResponseDtoParser(this.logger, protocolRules);
    const cbServiceFactory = new CbServiceFactory(
      this.logger,
      bluetooth,
      responseDtoParser
    );
    const repository = new AAsyncStorage(this.logger);
    const requestFactory = new RequestFactory(this.logger);

    this.combateApp = new CombateApp(
      this.logger,
      cbServiceFactory,
      csvTableService,
      requestFactory,
      protocolRules
    );
    this.configCache = new AConfigCache(
      this.logger,
      repository,
      DEFAULT_CONFIG
    );
    this.bluetoothApp = new BluetoothApp(this.logger, bluetooth);
    this.validator = new Validator(this.logger, this.configCache);
    this.preExecutionConfigCache = new APreExecutionConfigCache(
      this.logger,
      repository,
      DEFAULT_PRE_EXECUTION_CONFIG
    );
    this.errorHandler = new ErrorHandlerService(
      this.logger,
      this.bluetoothApp,
      csvTableService
    );
  }
}
