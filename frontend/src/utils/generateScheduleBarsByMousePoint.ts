import { generateScheduleBars } from '~/utils/generateScheduleBars';
import { CALENDAR, ONE_DAY } from '~/constants/calendar';
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

  const difference = getCalendarDateDifferenceByMousePoint(
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

const getCalendarDateDifferenceByMousePoint = (
  relativeX: number,
  relativeY: number,
  calendarWidth: number,
  calendarHeight: number,
) => {
  const rowDifference = Math.round(
    (relativeY * CALENDAR.ROW_SIZE) / calendarHeight,
  );
  const columnDifference = Math.round(
    (relativeX * CALENDAR.COLUMN_SIZE) / calendarWidth,
  );
  const calculatedDifference =
    rowDifference * CALENDAR.COLUMN_SIZE + columnDifference;

  return calculatedDifference;
};

const changeDateTimeByDays = (
  dateTime: Schedule['startDateTime'],
  days: number,
) => {
  const changedDate = new Date(Number(new Date(dateTime)) + ONE_DAY * days);

  const year = String(changedDate.getFullYear()).padStart(4, '0');
  const month = String(changedDate.getMonth() + 1).padStart(2, '0');
  const day = String(changedDate.getDate()).padStart(2, '0');
  const time = dateTime.split(' ')[1];
  const [minute, second] = time.split(':');

  const changedDateTime: Schedule['startDateTime'] = `${year}-${month}-${day} ${minute}:${second}`;

  return changedDateTime;
};
