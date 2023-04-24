import { Poison, PoisonEnum } from '../../internal/core/enum/poison';
import { Weather, WeatherEnum } from '../../internal/core/enum/weather';

class PtToDefaults {
  weather(weather: string): Weather {
    let valuePt = weather;
    switch (weather) {
      case 'Orvalho': //todo: create constants
        valuePt = WeatherEnum.DEW.name;
        break;
      case 'Pós chuva':
        valuePt = WeatherEnum.AFTER_RAIN.name;
        break;
      case 'Chance de chuva':
        valuePt = WeatherEnum.CHANCE_OF_RAIN.name;
        break;
      case 'Seco':
        valuePt = WeatherEnum.DRY.name;
        break;
      case 'Humido':
        valuePt = WeatherEnum.HUMID.name;
        break;
    }

    return { name: '' };
  }

  poison(poison: string): Poison {
    switch (poison) {
      case 'Granel SL':
        return PoisonEnum.SL;
      case 'Granel FP':
        return PoisonEnum.FP;
      case 'Mebio':
        return PoisonEnum.MEBIO;
      case 'Granel SL-R':
        return PoisonEnum.SL_R;
    }
    return { name: '' };
  }
}

export const ptToDefaults = new PtToDefaults();
