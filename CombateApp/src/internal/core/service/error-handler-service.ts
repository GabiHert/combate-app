import { Instance } from "../../../../view/app/instance/instance";
import { ShowToast } from "../../../../view/Components/AlertToast";
import { PBluetoothApp } from "../../../cmd/port/bluetooth-app-port";
import { SeverityEnum } from "../enum/severity";
import { PError } from "../error/error-port";
import { BluetoothErrorType } from "../error/error-type";
import { PCsvTableService } from "../port/csv-table-service-port";
import { PErrorHandlerService } from "../port/error-handler-service-port";
import { PLogger } from "../port/logger-port";

export class ErrorHandlerService implements PErrorHandlerService{
    private _filePath:string;
    constructor(
      private readonly _logger:PLogger,
      private readonly _bluetoothApp :PBluetoothApp,
      private readonly _csvTableService:PCsvTableService){}

    begin(filePath:string){
      this._filePath = filePath;
    }
   async handle(err: PError): Promise<void> {
    try{
        this._logger.info({
            event: 'ErrorHandlerService.handle',
            details: 'Process started',
            error: err.message,
          });

          if(err.notify){
            ShowToast({
              title:err.name + "-" + err.errorCode,
              message:err.message,
              durationMs:err.permanent?undefined:5000,
              severity:SeverityEnum.ERROR,
              closeButton:err.permanent,
              alertSounding:err.sound
            })
          }

          if (err.responseDto && err.requestDto){
              err.requestDto.alert = err.name          
              await this._csvTableService.insert(this._filePath,err.requestDto,err.responseDto)
          }

          if(err.errorCode == new BluetoothErrorType("").errorCode){
           await this._bluetoothApp.selectDevice(Instance.GetInstance().getConnectedDeviceId());
          }

        this._logger.info({
            event: 'ErrorHandlerService.handle',
            details: 'Process finished',
          });


        } catch (err) {
          if(err.notify){
            ShowToast({
              title:"Erro "+err.name+" - "+err.errorCode,
              message:err.message,
              durationMs:err.permanent?undefined:5000,
              severity:SeverityEnum.ERROR,
              closeButton:err.permanent,
              alertSounding:err.sound
            })
          }
        }
      
    }
    
}