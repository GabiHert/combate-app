import { DRequest } from '../../internal/core/dto/request-dto';
import { ProtocolVersion, ProtocolVersionEnum } from '../../internal/core/enum/protocol-version';
import { cbServiceFactory, CbServiceFactory } from '../../internal/core/factory/cb-service-factory';
import { requestFactory, RequestFactory } from '../../internal/core/factory/request-factory';
import { PCbService } from '../../internal/core/port/cb-service-port';
import { logger, PLogger } from '../../internal/core/port/logger-port';
import { protocolRules, ProtocolRules } from '../../internal/core/rules/protocol-rules';
import { PCombateApp } from '../port/combate-app-port';

class CombateApp implements PCombateApp {
  private _doseCallback: (done: number, target: number) => void;
  private _protocolVersion: ProtocolVersion;
  private _cbService: PCbService;
  constructor(
    private _logger: PLogger,
    private _cbServiceFactory: CbServiceFactory,
    private _requestFactory: RequestFactory,
    private _protocolRules: ProtocolRules
  ) {}

  async syncProtocolVersion(): Promise<void> {

    const requestDto = new DRequest();
    const request = this._requestFactory.factory(requestDto, ProtocolVersionEnum.V4);
    const cbV4Service = this._cbServiceFactory.factory(ProtocolVersionEnum.V4);
    const response = await cbV4Service.request(request);

    switch (true) {
      case this._protocolRules.V4(response):
        this._protocolVersion = ProtocolVersionEnum.V4;
        break;
    }

    this._cbService = this._cbServiceFactory.factory(this._protocolVersion);
  }

  async request(requestDto: DRequest): Promise<void> {
    if (!this._cbService) {
      this._cbService = this._cbServiceFactory.factory(this._protocolVersion);
    }
    const request = this._requestFactory.factory(requestDto, this._protocolVersion);

    await this._cbService.request(request, this._doseCallback);
  }

  setDoseCallback(callback: (done: number, target: number) => void): void {
    this._doseCallback = callback;
  }
}

export const combateApp = new CombateApp(logger, cbServiceFactory, requestFactory, protocolRules);
