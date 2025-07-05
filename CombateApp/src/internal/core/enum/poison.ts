import { sanitizeText } from "../../../../view/app/parser/sanitize-text";

enum Poisons {
  SL = "GRANEL SL",
  FP = "GRANEL FP",
  SL_R = "GRANEL SL-R",
  MEBIO = "MEBIO",
  OUTRO = "OUTRO",
}
class PoisonEnum_ {
  readonly MEBIO: { name: string } = {
    name: Poisons.MEBIO,
  };
  readonly SL_R: { name: string } = {
    name: Poisons.SL_R,
  };
  readonly FP: { name: string } = {
    name: Poisons.FP,
  };
  readonly SL: { name: string } = {
    name: Poisons.SL,
  };
  readonly OUTRO: { name: string } = {
    name: Poisons.OUTRO,
  };
}

export const PoisonEnum = new PoisonEnum_();

export class Poison {
  readonly name: string;
  constructor(poison: string) {
    switch (sanitizeText(poison)) {
      case PoisonEnum.FP.name:
      case PoisonEnum.MEBIO.name:
      case PoisonEnum.SL.name:
      case PoisonEnum.SL_R.name:
      case PoisonEnum.OUTRO.name:
        this.name = poison;
        break;
      default:
        throw new Error(`Unknown poison ${poison}`);
    }
  }
}

export const poisonItems: Array<{ id: string; name: string }> = [
  { id: PoisonEnum.SL.name, name: "GRANEL SL" },
  { id: PoisonEnum.FP.name, name: "GRANEL FP" },
  { id: PoisonEnum.SL_R.name, name: "GRANEL SL-R" },
  { id: PoisonEnum.MEBIO.name, name: "MEBIO" },
  { id: PoisonEnum.OUTRO.name, name: "OUTRO" },
];
