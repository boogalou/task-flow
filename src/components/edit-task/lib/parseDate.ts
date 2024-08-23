export function parseDate(inputDate: string) {
  const dateString = inputDate.slice(0, 10);
  const timeString = inputDate.slice(11, 16);

  return { dateString, timeString };
}
