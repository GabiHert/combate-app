export class DateTimeFormatter {
  date(date: Date): string {
    const day =
      date.getDate() > 9
        ? date.getDate().toString()
        : "0" + date.getDate().toString();
    const monthNumber = date.getMonth() + 1;
    const month =
      monthNumber > 9 ? monthNumber.toString() : "0" + monthNumber.toString();
    const year =
      date.getFullYear() > 9
        ? date.getFullYear().toString()
        : "0" + date.getFullYear().toString();

    return `${day}/${month}/${year.substring(2)}`;
  }

  time(date: Date): string {
    const hours =
      date.getHours() > 9
        ? date.getHours().toString()
        : "0" + date.getHours().toString();
    const minutes =
      date.getMinutes() > 9
        ? date.getMinutes().toString()
        : "0" + date.getMinutes().toString();
    const seconds =
      date.getSeconds() > 9
        ? date.getSeconds().toString()
        : "0" + date.getSeconds().toString();

    return `${hours}:${minutes}:${seconds}`;
  }
}

export const dateTimeFormatter = new DateTimeFormatter();
