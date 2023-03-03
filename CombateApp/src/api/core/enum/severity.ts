import { Theme } from "../../../app/theme/theme";

 enum Severities {
    WARN = "WARN",
    ERROR = "ERROR",
    OK = "OK",
  }

 class SeverityEnum_ {
    readonly WARN: {name:string,color:string} ={ name:Severities.WARN,color:Theme().color.sWarning};
    readonly ERROR: {name:string,color:string} ={ name:Severities.WARN,color:Theme().color.sWarning};
    readonly OK:{name:string,color:string} ={ name:Severities.WARN,color:Theme().color.sWarning};
}


export const SeverityEnum = new SeverityEnum_()

export class Severity {
    readonly name: string;
    readonly   color: string;
    constructor(severity:string){
        
        switch(severity){

            case Severities.WARN:
                this.name = SeverityEnum.WARN.name;
                this.color = SeverityEnum.WARN.color;
            case Severities.ERROR:
                this.name = SeverityEnum.ERROR.name;
                this.color = SeverityEnum.ERROR.color;

            case Severities.OK:
                this.name = SeverityEnum.OK.name;
                this.color = SeverityEnum.OK.color;
            default:
                throw new Error(`Unknown severity ${severity}`);

        }
    }
}

