import { BluetoothApp } from '../../cmd/bluetoothapp/bluetooth-app';
import { CombateApp } from '../../cmd/combateapp/combate-app';
import { Validator } from '../../cmd/formvalidator/form-validator';
import { PBluetoothApp } from '../../cmd/port/bluetooth-app-port';
import { PCombateApp } from '../../cmd/port/combate-app-port';
import { PValidator } from '../../cmd/port/validator-port';
import { ABluetooth } from '../../internal/adapter/bluetooth/bluetooth';
import { AConfigCache } from '../../internal/adapter/cache/config-cache';
import { APreExecutionConfigCache } from '../../internal/adapter/cache/pre-execution-config-cache';
import { ALogger } from '../../internal/adapter/logger/logger-adapter';
import { AAsyncStorage } from '../../internal/adapter/repository/async-storage-adapter';
import { DEFAULT_CONFIG, DEFAULT_PRE_EXECUTION_CONFIG } from '../../internal/config/config';
import { CheckSumBuilder } from '../../internal/core/builder/check-sum-builder';
import { CbServiceFactory } from '../../internal/core/factory/cb-service-factory';
import { requestFactory } from '../../internal/core/factory/request-factory';
import { ResponseDtoParser } from '../../internal/core/parser/response-dto-parser';
import { PCache } from '../../internal/core/port/cache-port';
import { PLogger } from '../../internal/core/port/logger-port';
import { ProtocolRules } from '../../internal/core/rules/protocol-rules';
import { CsvTableService } from '../../internal/core/service/csv-table-service';
import { IConfigsProps, IPreExecutionConfigProps } from '../../internal/interface/config-props';

export class Intance {
  readonly logger: PLogger;
  readonly combateApp: PCombateApp;
  readonly configCache: PCache<IConfigsProps>;
  readonly bluetoothApp: PBluetoothApp;
  readonly validator: PValidator;
  readonly preExecutionConfigCache: PCache<IPreExecutionConfigProps>;

  constructor() {
    this.logger = new ALogger(true);

    const bluetooth = new ABluetooth(this.logger);
    const csvTableService = new CsvTableService(this.logger, undefined);
    const checkSumBuilder = new CheckSumBuilder(this.logger);
    const protocolRules = new ProtocolRules(this.logger, checkSumBuilder);
    const responseDtoParser = new ResponseDtoParser(this.logger, protocolRules);
    const cbServiceFactory = new CbServiceFactory(this.logger, bluetooth, responseDtoParser);
    const repository = new AAsyncStorage(this.logger);

    this.combateApp = new CombateApp(
      this.logger,
      cbServiceFactory,
      csvTableService,
      requestFactory,
      protocolRules
    );
    this.configCache = new AConfigCache(this.logger, repository, DEFAULT_CONFIG);
    this.bluetoothApp = new BluetoothApp(this.logger, bluetooth);
    this.validator = new Validator(this.logger, this.configCache);
    this.preExecutionConfigCache = new APreExecutionConfigCache(
      this.logger,
      repository,
      DEFAULT_PRE_EXECUTION_CONFIG
    );
  }
}

export const instance = new Intance();
