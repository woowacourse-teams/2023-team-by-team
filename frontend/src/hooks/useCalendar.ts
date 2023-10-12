import { useState } from 'react';
import { CALENDAR } from '~/constants/calendar';
import { arrayOf } from '~/utils/arrayOf';
import { parseDate } from '~/utils/parseDate';

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { year, month, date } = parseDate(currentDate);
  const { day: startDayOfMonth } = parseDate(new Date(year, month, 1));
  const today = parseDate(new Date());

  const handlePrevButtonClick = () => {
    setCurrentDate(() => new Date(year, month - 1, date));
  };

  const handleNextButtonClick = () => {
    setCurrentDate(() => new Date(year, month + 1, date));
  };

  const createCalendar = (year: number, month: number) =>
    arrayOf(CALENDAR.ROW_SIZE).map((weekIndex) =>
      arrayOf(CALENDAR.COLUMN_SIZE).map((dayIndex) => {
        const day = weekIndex * 7 + dayIndex - startDayOfMonth + 1;
        const date = new Date(year, month, day);

        return date;
      }),
    );

  const calendar = createCalendar(year, month);

  return {
    year,
    month,
    calendar,
    currentDate,
    today,
    handlers: {
      handlePrevButtonClick,
      handleNextButtonClick,
    },
  };
};

export default useCalendar;
