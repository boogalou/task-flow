import { format as formatTz, toZonedTime } from 'date-fns-tz';
import { format, Locale } from 'date-fns';

export function formatDetailsDate(inputDate: string, locale: Locale, isZoned: boolean = false) {
  if (isZoned) {
    return formatTz(toZonedTime(new Date(inputDate), 'UTC'), 'EEE, MMM dd, HH:mm', { locale });
  }

  return format(new Date(inputDate), 'EEE, MMM dd, HH:mm', { locale });
}
