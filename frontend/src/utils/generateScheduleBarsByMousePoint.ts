import { generateScheduleBars } from '~/utils/generateScheduleBars';
import type { Schedule } from '~/types/schedule';
import type { CalendarSize } from '~/types/size';

interface GenerateScheduleBarsByMousePointProps {
  schedule: Schedule;
  year: number;
  month: number;
  relativeX: number;
  relativeY: number;
  calendarWidth: number;
  calendarHeight: number;
  level: number;
  calendarSize: CalendarSize;
}

const getCalendarGridDifference = (
  relativeX: number,
  relativeY: number,
  calendarWidth: number,
  calendarHeight: number,
) => {
  const rowDifference = Math.round((relativeY * 6) / calendarHeight);
  const columnDifference = Math.round((relativeX * 7) / calendarWidth);
  const calculatedDifference = rowDifference * 7 + columnDifference;

  return calculatedDifference;
};

const changeDateTimeByDays = (
  dateTime: Schedule['startDateTime'],
  days: number,
) => {
  const changedDate = new Date(Number(new Date(dateTime)) + 86_400_000 * days);

  const year = String(changedDate.getFullYear()).padStart(4, '0');
  const month = String(changedDate.getMonth() + 1).padStart(2, '0');
  const day = String(changedDate.getDate()).padStart(2, '0');
  const time = dateTime.split(' ')[1];
  const [minute, second] = time.split(':');

  const changedDateTime: Schedule['startDateTime'] = `${year}-${month}-${day} ${minute}:${second}`;

  return changedDateTime;
};

export const generateScheduleBarsByMousePoint = (
  params: GenerateScheduleBarsByMousePointProps,
) => {
  const {
    schedule,
    year,
    month,
    relativeX,
    relativeY,
    calendarWidth,
    calendarHeight,
    level,
    calendarSize,
  } = params;

  const difference = getCalendarGridDifference(
    relativeX,
    relativeY,
    calendarWidth,
    calendarHeight,
  );
  const { startDateTime, endDateTime } = schedule;
  const generatedScheduleBars = generateScheduleBars(year, month, [
    {
      ...schedule,
      startDateTime: changeDateTimeByDays(startDateTime, difference),
      endDateTime: changeDateTimeByDays(endDateTime, difference),
    },
  ]).map((scheduleBar) => ({
    ...scheduleBar,
    level,
    calendarSize,
  }));

  return generatedScheduleBars;
};
