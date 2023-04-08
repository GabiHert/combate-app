import { Weather, WeatherEnum } from '../../internal/core/enum/weather';

export function weatherToPtWeather(weather: string): string {
  switch (weather) {
    case WeatherEnum.DEW.name: //todo: create constants
      return 'Orvalho';
    case WeatherEnum.AFTER_RAIN.name:
      return 'Pós chuva';
    case WeatherEnum.CHANCE_OF_RAIN.name:
      return 'Chance de chuva';
    case WeatherEnum.DRY.name:
      return 'Seco';
    case WeatherEnum.HUMID.name:
      return 'Humido';
  }
}
