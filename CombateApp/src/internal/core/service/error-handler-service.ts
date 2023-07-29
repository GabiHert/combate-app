import { ShowToast } from "../../../../view/Components/AlertToast";
import { PBluetoothApp } from "../../../cmd/port/bluetooth-app-port";
import { SeverityEnum } from "../enum/severity";
import { PError } from "../error/error-port";
import { PCsvTableService } from "../port/csv-table-service-port";
import { PErrorHandlerService } from "../port/error-handler-service-port";
import { PLogger } from "../port/logger-port";

export class ErrorHandlerService implements PErrorHandlerService{
    constructor(private readonly _logger:PLogger,private readonly bluetoothApp :PBluetoothApp,csvTableService:PCsvTableService){}
   async handle(err: PError): Promise<void> {
        this._logger.info({
            event: 'ErrorHandlerService.handle',
            details: 'Process started',
            error: err.message,
          });

          if(err.notify){
            ShowToast({
              title:"Erro "+err.name+" - "+err.errorCode,
              message:err.message,
              durationMs:err.permanent?undefined:3000,
              severity:SeverityEnum.ERROR,
              closeButton:err.permanent,
              alertSounding:err.sound
            })
          }



        this._logger.info({
            event: 'ErrorHandlerService.handle',
            details: 'Process finished',
          });
    }
    
    
}