import { dayNames, monthNames } from "../../formatters/date-names";

export function formatTransactions(data: any) {
  for (const key in data) {
    const date = new Date(data[key]?.created_at);
    data[key].month = String(date.getMonth());
    data[key].monthName = monthNames[date.getMonth()];
    data[key].day = String(date.getDay());
    data[key].dayName = String(dayNames[date.getDay()]);
    data[key].year = String(date.getFullYear());
    data[key].time = String(date.getHours()) + ":" + String(date.getMinutes());
  }

  return data;
}
