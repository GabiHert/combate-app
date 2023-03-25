enum Poisons {
  SL = 'SL',
  FP = 'FP',
  SL_R = 'SL_R',
  MEBIO = 'MEBIO',
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
}

export const PoisonEnum = new PoisonEnum_();

export class Poison {
  readonly name: string;
  constructor(poison: string) {
    switch (poison) {
      case PoisonEnum.FP.name:
        this.name = PoisonEnum.FP.name;
        break;

      case PoisonEnum.MEBIO.name:
        this.name = PoisonEnum.MEBIO.name;
        break;

      case PoisonEnum.SL.name:
        this.name = PoisonEnum.SL.name;
        break;

      case PoisonEnum.SL_R.name:
        this.name = PoisonEnum.SL_R.name;
        break;
      default:
        throw new Error(`Unknown poison ${poison}`);
    }
  }
}

export const poisonItems: Array<{ id: string; name: string }> = [
  { id: PoisonEnum.FP.name, name: 'Granel SL' },
  { id: PoisonEnum.MEBIO.name, name: 'Granel FP' },
  { id: PoisonEnum.SL.name, name: 'Grandel SL-R' },
  { id: PoisonEnum.SL_R.name, name: 'Mebio' },
];
