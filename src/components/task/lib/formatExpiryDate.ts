import { differenceInDays, format, isThisYear, isTomorrow } from 'date-fns';

export function formatExpiryDate(date: Date): string {
  const now = new Date();
  const differenceInHours = (date.getTime() - now.getTime()) / 36e5;
  const differenceInDaysValue = differenceInDays(date, now);

  switch (true) {
    case differenceInHours <= 24:
      return `by ${format(date, 'HH:mm')}`;
    case isTomorrow(date):
      return `by tomorrow ${format(date, 'HH:mm')}`;
    case differenceInDaysValue <= 7:
      return `by ${format(date, 'EEE. HH:mm')}`;
    case isThisYear(date):
      return `by ${format(date, 'MMM. d, HH:mm')}`;
    default:
      return `by ${format(date, 'yyyy, MMM d, HH:mm')}`;
  }
}
