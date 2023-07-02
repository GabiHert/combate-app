enum Weathers {
  SECO = 'Seco',
  HUMIDO = 'Humido',
  ABAFADO = 'Abafado',
  POS_CHUVA = 'Pós chuva',
  CHANCE_DE_CHUVA = 'Chance de chuva',
  ORVALHO = 'Orvalho',
}

class WeatherEnum_ {
  readonly SECO: { name: string } = {
    name: Weathers.SECO,
  };
  readonly HUMID: { name: string } = {
    name: Weathers.HUMIDO,
  };
  readonly POS_CHUVA: { name: string } = {
    name: Weathers.POS_CHUVA,
  };
  readonly CHANCE_DE_CHUVA: { name: string } = {
    name: Weathers.CHANCE_DE_CHUVA,
  };
  readonly ORVALHO: { name: string } = {
    name: Weathers.ORVALHO,
  };
}

export const WeatherEnum = new WeatherEnum_();

export class Weather {
  readonly name: string;
  constructor(weather: string) {
    switch (weather) {
      case WeatherEnum.SECO.name:
        this.name = Weathers.SECO;
        break;

      case WeatherEnum.HUMID.name:
        this.name = Weathers.HUMIDO;
        break;

      case WeatherEnum.POS_CHUVA.name:
        this.name = Weathers.POS_CHUVA;
        break;

      case WeatherEnum.CHANCE_DE_CHUVA.name:
        this.name = Weathers.CHANCE_DE_CHUVA;
        break;

      case WeatherEnum.ORVALHO.name:
        this.name = Weathers.ORVALHO;
        break;
      default:
        throw new Error(`Unknown weather ${weather}`);
    }
  }
}

export const weatherItems: Array<{ id: string; name: string }> = [
  { id: WeatherEnum.POS_CHUVA.name, name: 'Pós chuva' },
  { id: WeatherEnum.CHANCE_DE_CHUVA.name, name: 'Chance de chuva' },
  { id: WeatherEnum.ORVALHO.name, name: 'Orvalho' },
  { id: WeatherEnum.SECO.name, name: 'Seco' },
  { id: WeatherEnum.HUMID.name, name: 'Humido' },
];
