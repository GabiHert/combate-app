import { TMapString } from '../../api/interface/config-props';

export function stopReasonToItemArray(stopReason: TMapString): Array<{ name: string; id: string }> {
  const items: Array<{ name: string; id: string }> = [];
  Object.keys(stopReason).forEach((key) => {
    items.push({ id: key, name: stopReason[key] });
  });
  return items;
}
