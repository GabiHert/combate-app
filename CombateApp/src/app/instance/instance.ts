import { BluetoothApp } from '../../cmd/bluetoothapp/bluetooth-app';
import { CombateApp } from '../../cmd/combateapp/combate-app';
import { Validator } from '../../cmd/formvalidator/form-validator';
import { ABluetooth } from '../../internal/adapter/bluetooth/bluetooth';
import { AConfigCache } from '../../internal/adapter/cache/config-cache';
import { DEFAULT_CONFIG } from '../../internal/config/config';
import { CbServiceFactory } from '../../internal/core/factory/cb-service-factory';
import { requestFactory } from '../../internal/core/factory/request-factory';
import { responseDtoParser } from '../../internal/core/parser/response-dto-parser';
import { logger } from '../../internal/core/port/logger-port';
import { repository } from '../../internal/core/port/repository-port';
import { protocolRules } from '../../internal/core/rules/protocol-rules';
import { CsvTableService } from '../../internal/core/service/csv-table-service';
const bluetooth = new ABluetooth(logger);
const csvTableService = new CsvTableService(logger, undefined);
const cbServiceFactory = new CbServiceFactory(logger, bluetooth, responseDtoParser);

export const combateApp = new CombateApp(
  logger,
  cbServiceFactory,
  csvTableService,
  requestFactory,
  protocolRules
);

export const config = new AConfigCache(repository, DEFAULT_CONFIG);
export const bluetoothApp = new BluetoothApp(logger, bluetooth);
export const validator = new Validator(logger, config);
