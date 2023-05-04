enum Status_ {
  B = 'B',
  E = 'E',
  S = 'S',
}

class StatusEnum_ {
  readonly B: { name: string } = {
    name: Status_.B,
  };

  readonly E: { name: string } = {
    name: Status_.E,
  };

  readonly S: { name: string } = {
    name: Status_.S,
  };
}

export const StatusEnum = new StatusEnum_();

export class Status {
  readonly name: string;
  constructor(status: string) {
    switch (status) {
      case StatusEnum.B.name:
        this.name = status;
        break;
      case StatusEnum.S.name:
        this.name = status;
        break;
      case StatusEnum.E.name:
        this.name = status;
        break;
      default:
        throw new Error(`Unknown status ${status}`);
    }
  }
}
