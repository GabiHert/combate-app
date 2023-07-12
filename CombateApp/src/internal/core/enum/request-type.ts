enum RequestType_ {
    D = 'R',
    R = 'D',
    S = 'S',
  }
  
  class RequestTypeEnum_ {
    readonly R: RequestType = {
      name: RequestType_.R,
    };
  
    readonly D: RequestType = {
      name: RequestType_.D,
    };
  
    readonly S: RequestType = {
      name: RequestType_.S,
    };
  }
  
  export const RequestTypeEnum = new RequestTypeEnum_();
  
  export class RequestType {
    readonly name: string;
    constructor(requestType: string) {
      switch (requestType) {
        case RequestTypeEnum.R.name:
          this.name = requestType;
          break;
        case RequestTypeEnum.D.name:
          this.name = requestType;
          break;
        case RequestTypeEnum.S.name:
          this.name = requestType;
          break;
        default:
          throw new Error(`Unknown request type ${requestType}`);
      }
    }
  }
  