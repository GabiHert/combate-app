enum Weathers {
  DRY = 'DRY',
  HUMID = 'HUMID',
  MUGGY = 'MUGGY',
  AFTER_RAIN = 'AFTER_RAIN',
  CHANCE_OF_RAIN = 'CHANCE_OF_RAIN',
  DEW = 'DEW',
}

class WeatherEnum_ {
  readonly DRY: { name: string } = {
    name: Weathers.DRY,
  };
  readonly HUMID: { name: string } = {
    name: Weathers.HUMID,
  };
  readonly AFTER_RAIN: { name: string } = {
    name: Weathers.AFTER_RAIN,
  };
  readonly CHANCE_OF_RAIN: { name: string } = {
    name: Weathers.CHANCE_OF_RAIN,
  };
  readonly DEW: { name: string } = {
    name: Weathers.DEW,
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

      case WeatherEnum.AFTER_RAIN.name:
        this.name = Weathers.AFTER_RAIN;
        break;

      case WeatherEnum.CHANCE_OF_RAIN.name:
        this.name = Weathers.CHANCE_OF_RAIN;
        break;

      case WeatherEnum.DEW.name:
        this.name = Weathers.DEW;
        break;
      default:
        throw new Error(`Unknown weather ${weather}`);
    }
  }
}

export const weatherItems: Array<{ id: string; name: string }> = [
  { id: WeatherEnum.AFTER_RAIN.name, name: 'Pós chuva' },
  { id: WeatherEnum.CHANCE_OF_RAIN.name, name: 'Chance de chuva' },
  { id: WeatherEnum.DEW.name, name: 'Orvalho' },
  { id: WeatherEnum.DRY.name, name: 'Seco' },
  { id: WeatherEnum.HUMID.name, name: 'Humido' },
];
