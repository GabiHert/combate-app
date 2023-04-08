import { TMapString } from '../../internal/interface/config-props';

export function mapStringToItemArray(mapString: TMapString): Array<{ name: string; id: string }> {
  const items: Array<{ name: string; id: string }> = [];
  Object.keys(mapString).forEach((key) => {
    items.push({ id: key, name: mapString[key] });
  });
  return items;
}
