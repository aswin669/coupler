export function convertMinutesToHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

export function convertToTotalMinutes(hours: number, minutes: number): number {
  return hours * 60 + minutes;
}
