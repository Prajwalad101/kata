const hours = [
  '12',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
] as const;
const minutes = ['00', '15', '30', '45'] as const;

export type TimeString = `${typeof hours[number]}:${typeof minutes[number]} ${
  | 'AM'
  | 'PM'}`;

const time: TimeString[] = [];

// add hours for AM
hours.forEach((hour) => {
  minutes.forEach((minute) => {
    time.push(`${hour}:${minute} AM`);
  });
});

// add hours for PM
hours.forEach((hour) => {
  minutes.forEach((minute) => {
    time.push(`${hour}:${minute} PM`);
  });
});

export default time;
