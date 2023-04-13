import { msToTime } from './msToTime';

/**
 * converts the given date into relative date
 * @param date the date to get the relative date from
 * @returns the relative date derived from date variable and current date
 */
export function getRelativeDate(date: string) {
  const formatter = new Intl.RelativeTimeFormat('en-US', {
    numeric: 'auto',
    style: 'narrow',
  });

  const diff: number = new Date().getTime() - new Date(date).getTime(); // difference in milliseconds

  const { days, hours, minutes, sec } = msToTime(diff);

  let result = '';

  if (days !== 0) {
    result = formatter.format(-days, 'day');
  } else if (hours !== 0) {
    result = formatter.format(-hours, 'hour');
  } else if (minutes !== 0) {
    result = formatter.format(-minutes, 'minute');
  } else if (sec !== 0) {
    result = formatter.format(-sec, 'second');
  } else {
    result = 'Just Now'
  }

  return result;
}
