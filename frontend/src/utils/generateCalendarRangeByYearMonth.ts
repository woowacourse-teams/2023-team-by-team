import { CALENDAR, ONE_DAY } from '~/constants/calendar';
import { generateYYYYMMDDWithoutHyphens } from '~/utils/generateYYYYMMDDWithoutHyphens';
import type { DateRange } from '~/types/schedule';

export const generateCalendarRangeByYearMonth = (
  year: number,
  month: number,
): DateRange => {
  const firstDateOfMonth = new Date(year, month);
  const firstDateOfCalendar = new Date(
    firstDateOfMonth.getTime() - ONE_DAY * firstDateOfMonth.getDay(),
  );
  const lastDateOfCalendar = new Date(
    firstDateOfCalendar.getTime() +
      CALENDAR.ROW_SIZE * CALENDAR.COLUMN_SIZE * ONE_DAY -
      1,
  );

  const startDate = generateYYYYMMDDWithoutHyphens(firstDateOfCalendar);
  const endDate = generateYYYYMMDDWithoutHyphens(lastDateOfCalendar);

  return { startDate, endDate };
};
