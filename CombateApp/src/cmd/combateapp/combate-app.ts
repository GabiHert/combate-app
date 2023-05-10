import { event } from 'react-native-reanimated';
import { ABluetooth } from '../../internal/adapter/bluetooth/bluetooth';
import { RequestDto } from '../../internal/core/dto/request-dto';
import { Event, EventEnum } from '../../internal/core/enum/event';
import { ProtocolVersion, ProtocolVersionEnum } from '../../internal/core/enum/protocol-version';
import { CbServiceFactory } from '../../internal/core/factory/cb-service-factory';
import { RequestFactory, requestFactory } from '../../internal/core/factory/request-factory';
import { responseDtoParser } from '../../internal/core/parser/response-dto-parser';
import { PCbService } from '../../internal/core/port/cb-service-port';
import { PCsvTableService } from '../../internal/core/port/csv-table-service-port';
import { PLogger, logger } from '../../internal/core/port/logger-port';
import { ProtocolRules, protocolRules } from '../../internal/core/rules/protocol-rules';
import { distanceCalculator } from '../../internal/core/utils/distance-caluclator';
import { IRequestDtoArgs } from '../../internal/interface/request-dto-args';
import { PCombateApp } from '../port/combate-app-port';

class CombateApp implements PCombateApp {
  private _doseCallback: (done: number, target: number) => void;
  private _protocolVersion: ProtocolVersion;
  private _cbService: PCbService;
  private _filePath: string;
  private _distanceRan: number;

  constructor(
    private readonly _logger: PLogger,
    private _cbServiceFactory: CbServiceFactory,
    private _csvTableService: PCsvTableService,
    private _requestFactory: RequestFactory,
    private _protocolRules: ProtocolRules
  ) {}

  private async _syncProtocolVersion(requestDto: RequestDto): Promise<void> {
    const request = this._requestFactory.factory(requestDto, ProtocolVersionEnum.V4);
    const cbV4Service = this._cbServiceFactory.factory(ProtocolVersionEnum.V4);
    const response = await cbV4Service.request(request);

    this._protocolVersion = this._protocolRules.getProtocolVersion(response);

    this._cbService = this._cbServiceFactory.factory(this._protocolVersion);
  }

  async setFilePath(path: string): Promise<void> {
    this._filePath = path;
    await this._csvTableService.save(this._filePath);
  }
  async request(requestDto: RequestDto): Promise<void> {
    if (!this._cbService || !this._protocolVersion) {
      await this._syncProtocolVersion(requestDto);
      this._cbService = this._cbServiceFactory.factory(this._protocolVersion);
    }

    const request = this._requestFactory.factory(requestDto, this._protocolVersion);

    const responseDto = await this._cbService.request(request, this._doseCallback);

    //const distanceCalculator()

    this._csvTableService.insert(requestDto, responseDto, event);

    if (requestDto.event === EventEnum.EndTrackPoint) {
      await this._csvTableService.save(this._filePath);
    }
  }

  setDoseCallback(callback: (done: number, target: number) => void): void {
    this._doseCallback = callback;
  }
}
