import { differenceInDays, isThisYear, isTomorrow } from 'date-fns';
import { format as formatTz, toZonedTime } from 'date-fns-tz';

export function formatExpiryDate(inputDate: string): string {
  const now = new Date();
  const zonedDate = toZonedTime(inputDate, 'UTC');
  const differenceInHours = (zonedDate.getTime() - now.getTime()) / 36e5;
  const differenceInDaysValue = differenceInDays(zonedDate, now);

  switch (true) {
    case differenceInHours <= 24:
      return `by ${formatTz(zonedDate, 'HH:mm', { timeZone: 'UTC' })}`;
    case isTomorrow(zonedDate):
      return `by завтра ${formatTz(zonedDate, 'HH:mm', { timeZone: 'UTC' })}`;
    case differenceInDaysValue <= 7:
      return `by ${formatTz(zonedDate, 'EEE. HH:mm', { timeZone: 'UTC' })}`;
    case isThisYear(zonedDate):
      return `by ${formatTz(zonedDate, 'MMM. d, HH:mm', { timeZone: 'UTC' })}`;
    default:
      return `by ${formatTz(zonedDate, 'yyyy, MMM d, HH:mm', { timeZone: 'UTC' })}`;
  }
}

// export function formatExpiryDate(inputDate: string): string {
//   const now = new Date();
//   const date = new Date(inputDate);
//   const differenceInHours = (date.getTime() - now.getTime()) / 36e5;
//   const differenceInDaysValue = differenceInDays(inputDate, now);
//
//   switch (true) {
//     case differenceInHours <= 24:
//       return `by ${format(inputDate, 'HH:mm')}`;
//     case isTomorrow(inputDate):
//       return `by tomorrow ${format(inputDate, 'HH:mm')}`;
//     case differenceInDaysValue <= 7:
//       return `by ${format(inputDate, 'EEE. HH:mm')}`;
//     case isThisYear(inputDate):
//       return `by ${format(inputDate, 'MMM. d, HH:mm')}`;
//     default:
//       return `by ${format(inputDate, 'yyyy, MMM d, HH:mm')}`;
//   }
// }
