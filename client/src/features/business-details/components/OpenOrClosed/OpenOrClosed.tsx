import { IBusiness } from '@destiny/common/types';
import { convertTime12to24, timeToDate } from 'src/utils/date';

export default function openOrClosed(workingDays: IBusiness['workingDays']) {
  const days = workingDays.map((workingDay) => workingDay.day);

  const currentDate = new Date();
  const currentDay = currentDate.toLocaleString('en-us', { weekday: 'long' });

  if (!days.includes(currentDay)) {
    // calculate time until business opens on the next working day
    let nextWorkingDay = currentDay;
    while (!days.includes(nextWorkingDay)) {
      currentDate.setDate(currentDate.getDate() + 1);
      nextWorkingDay = currentDate.toLocaleString('en-us', { weekday: 'long' });
    }
    return `Opens ${nextWorkingDay}`;
  }

  const workingDay = workingDays.find((day) => day.day === currentDay);
  if (!workingDay) return 'Closed';

  const startDate = timeToDate(convertTime12to24(workingDay.startTime));
  const endDate = timeToDate(convertTime12to24(workingDay.endTime));

  // check if current time is between opening and closing hours
  if (currentDate >= startDate && currentDate <= endDate) {
    // calculate time until the business closes
    const timeUntilClose = endDate.getTime() - currentDate.getTime();
    const hoursUntilClose = Math.floor(timeUntilClose / (1000 * 60 * 60));
    return `Closes in ${hoursUntilClose} hrs`;
  } else {
    // calculate time until the business opens
    const timeUntilOpen = startDate.getTime() - currentDate.getTime();
    const hoursUntilOpen = Math.floor(
      (timeUntilOpen % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    return `Opens in ${hoursUntilOpen} hrs`;
  }
}
