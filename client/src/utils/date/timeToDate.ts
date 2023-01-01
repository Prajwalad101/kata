/**
 * sets the hours and minutes to new date object
 * @param time array containing hour and minute eg: ["5", "10"] - 5hr 10min
 * @returns the current date with the hours and minutes set
 */
export default function timeToDate(time: string) {
  const date = new Date();
  const [hours, minutes] = time.split(':');

  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));

  return date;
}
