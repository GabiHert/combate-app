import { Weather, WeatherEnum } from '../../api/core/enum/weather';

export function ptWeatherToWeather(weather: string): Weather {
  let valueEn = weather;
  switch (weather) {
    case 'Orvalho': //todo: create constants
      valueEn = WeatherEnum.DEW.name;
      break;
    case 'Pós chuva':
      valueEn = WeatherEnum.AFTER_RAIN.name;
      console.log(valueEn);
      break;
    case 'Chance de chuva':
      valueEn = WeatherEnum.CHANCE_OF_RAIN.name;
      break;
    case 'Seco':
      valueEn = WeatherEnum.DRY.name;
      break;
    case 'Humido':
      valueEn = WeatherEnum.HUMID.name;
      break;
  }

  return new Weather(valueEn);
}
