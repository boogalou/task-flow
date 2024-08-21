import { format, parseISO } from 'date-fns';

export function parseDate(inputDate: string) {
  const date = parseISO(inputDate);
  const dateString = format(date, 'yyyy-MM-dd');
  const timeString = format(date, 'HH:mm');

  return { dateString, timeString };
}
