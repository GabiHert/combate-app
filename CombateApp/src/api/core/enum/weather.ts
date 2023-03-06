enum Weathers {
  DRY = 'DRY',
  HUMID = 'HUMID',
  MUGGY = 'MUGGY',
}

class WeatherEnum_ {
  readonly DRY: { name: string } = {
    name: Weathers.DRY,
  };
  readonly HUMID: { name: string } = {
    name: Weathers.HUMID,
  };
  readonly MUGGY: { name: string } = {
    name: Weathers.MUGGY,
  };
}

export const WeatherEnum = new WeatherEnum_();

export class Weather {
  readonly name: string;
  constructor(weather: string) {
    switch (weather) {
      case WeatherEnum.DRY.name:
        this.name = Weathers.DRY;
        break;

      case WeatherEnum.HUMID.name:
        this.name = Weathers.HUMID;
        break;

      case WeatherEnum.MUGGY.name:
        this.name = Weathers.MUGGY;
        break;
      default:
        throw new Error(`Unknown weather ${weather}`);
    }
  }
}
