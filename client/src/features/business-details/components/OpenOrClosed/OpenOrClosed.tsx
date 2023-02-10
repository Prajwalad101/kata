import { IBusiness } from '@destiny/common/types';
import { convertTime12to24, timeToDate } from 'src/utils/date';

interface OpenOrClosedProps {
  workingDays: IBusiness['workingDays'];
  className?: string;
}

const weeks = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default function OpenOrClosed({
  workingDays,
  className = '',
}: OpenOrClosedProps) {
  const currentDate = new Date();
  const dayIndex = currentDate.getDay();

  const currentDay = weeks[dayIndex];

  // Check if current day is present in working Days
  const workingDay = workingDays.find(
    (workingDay) => workingDay.day.toLowerCase() === currentDay.toLowerCase()
  );

  if (!workingDay) {
    return (
      <div className={className}>
        <span className="inline-block font-medium">Closed</span>
      </div>
    );
  }

  // convert time to date for comparison
  const openingDate = timeToDate(convertTime12to24(workingDay.startTime));
  const closingDate = timeToDate(convertTime12to24(workingDay.endTime));

  const isOpen = openingDate < currentDate && closingDate > currentDate;

  // add opening hours with hours remaining in the current day
  // const hoursTillOpen = 24 - openingDate.getHours() + currentDate.getHours();

  return <div className={className}>{isOpen ? 'Open' : 'Closed'}</div>;
}
