import { IItem } from '../../../src/internal/interface/item';
import { TMapString } from '../../../src/internal/types/map-string';

export function itemArrayToMapString(itemArray: Array<IItem>): TMapString {
  let map: TMapString;
  itemArray.forEach((item) => {
    map = { ...map, [item.id]: item.name };
  });

  return map;
}
