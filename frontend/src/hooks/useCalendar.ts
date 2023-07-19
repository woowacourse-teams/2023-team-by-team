import { useState } from 'react';
import { arrayOf } from '~/utils/arrayOf';
import { parseDate } from '~/utils/parseDate';

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { year, month } = parseDate(currentDate);
  const { day: startDayOfMonth } = parseDate(new Date(currentDate.setDate(1)));

  const handlePrevButtonClick = () => {
    setCurrentDate(() => new Date(year, month - 1));
  };

  const handleNextButtonClick = () => {
    setCurrentDate(() => new Date(year, month + 1));
  };

  const createCalendar = (year: number, month: number) =>
    arrayOf(6).map((weekIndex) =>
      arrayOf(7).map((dayIndex) => {
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

    handlers: {
      handlePrevButtonClick,
      handleNextButtonClick,
    },
  };
};

export default useCalendar;
