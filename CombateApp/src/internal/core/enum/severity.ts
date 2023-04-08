import { Theme } from '../../../app/theme/theme';

enum Severities {
  WARN = 'warning',
  ERROR = 'error',
  OK = 'success',
}

class SeverityEnum_ {
  readonly WARN: { name: string; color: string; message: string } = {
    name: Severities.WARN,
    color: Theme().color.sWarning,
    message: 'Atenção',
  };
  readonly ERROR: { name: string; color: string; message: string } = {
    name: Severities.ERROR,
    color: Theme().color.sError,
    message: 'Erro',
  };
  readonly OK: { name: string; color: string; message: string } = {
    name: Severities.OK,
    color: Theme().color.sOk,
    message: 'Ok',
  };
}

export const SeverityEnum = new SeverityEnum_();

export class Severity {
  readonly name: string;
  readonly color: string;
  message: string;
  constructor(severity: string) {
    switch (severity) {
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
