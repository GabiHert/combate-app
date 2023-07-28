export class PError extends Error {
  readonly message: string;
  readonly name: string;
  readonly errorCode: string;
  readonly notify:boolean;
  readonly sound:boolean;
  readonly permanent:boolean
  constructor(name:string,message: string, errorCode: string,
              notify:boolean,sound:boolean,permanent:boolean) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.notify = notify;
    this.permanent = permanent;
    this.sound = sound;
    this.name = name;
  }
}
