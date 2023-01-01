/**
 * Converts time from 12 hr format to 24 hr format
 * @param time12h the time in 12 hour format eg: 1:00 PM
 * @returns the formatted time in 24 hour format eg: 13:00
 */
export default function convertTime12to24(time12h: string) {
  const [time, modifier] = time12h.split(' ');

  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  return `${hours}:${minutes}`;
}
