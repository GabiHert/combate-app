import { TMapString } from '../../internal/interface/config-props';

export function itemArrayToMapString(itemArray: Array<{ name: string; id: string }>): TMapString {
  let map: TMapString;
  itemArray.forEach((item) => {
    map = { ...map, [item.id]: item.name };
  });

  return map;
}
