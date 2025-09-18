export function createDateFromTime(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date(0); // Jan 1, 1970 UTC
  date.setUTCHours(hours, minutes, 0, 0); // UTC to avoid timezone shifting
  return date;
}
