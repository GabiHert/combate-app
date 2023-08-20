import { IItem } from "../../../src/internal/interface/item";

export function userToItemArray(
  users: { USER: string; PASSWORD: string }[]
): Array<IItem> {
  const items: Array<IItem> = [];
  users.forEach((user, i) => {
    items.push({ id: i.toString(), name: user.USER });
  });

  return items;
}
