import { differenceInDays, isThisYear, isTomorrow } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';

export function formatExpiryDate(inputDate: string): string {
  const now = new Date();
  const zonedDate = toZonedTime(inputDate, 'UTC');
  const differenceInHours = (zonedDate.getTime() - now.getTime()) / 36e5;
  const differenceInDaysValue = differenceInDays(zonedDate, now);

  switch (true) {
    case differenceInHours <= 24:
      return `by ${format(zonedDate, 'HH:mm', { timeZone: 'UTC' })}`;
    case isTomorrow(zonedDate):
      return `by завтра ${format(zonedDate, 'HH:mm', { timeZone: 'UTC' })}`;
    case differenceInDaysValue <= 7:
      return `by ${format(zonedDate, 'EEE. HH:mm', { timeZone: 'UTC' })}`;
    case isThisYear(zonedDate):
      return `by ${format(zonedDate, 'MMM. d, HH:mm', { timeZone: 'UTC' })}`;
    default:
      return `by ${format(zonedDate, 'yyyy, MMM d, HH:mm', { timeZone: 'UTC' })}`;
  }
}
