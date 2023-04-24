import { IItem } from '../../internal/interface/item';
import { TMapString } from '../../internal/types/map-string';

export function mapStringToItemArray(mapString: TMapString): Array<IItem> {
  const items: Array<IItem> = [];
  Object.keys(mapString).forEach((key) => {
    items.push({ id: key, name: mapString[key] });
  });
  return items;
}
