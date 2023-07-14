import { useState } from 'react';
import * as S from './Calendar.styled';
import { arrayOf } from '~/utils/arrayOf';
import { parseDate } from '~/utils/parseDate';
import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import DateCell from '~/components/Calendar/DateCell/DateCell';
import { css } from 'styled-components';

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'] as const;

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { year, month } = parseDate(currentDate);
  const { day: startDayOfMonth } = parseDate(new Date(currentDate.setDate(1)));

  const handlePrevButtonClick = () => {
    setCurrentDate(() => new Date(year, month - 1));
  };

  const handleNextButtonClick = () => {
    setCurrentDate(() => new Date(year, month + 1));
  };

  const createCalendar = () =>
    arrayOf(6).map((weekIndex) =>
      arrayOf(7).map((dayIndex) => {
        const day = weekIndex * 7 + dayIndex - startDayOfMonth + 1;
        const date = new Date(year, month, day);

        return date;
      }),
    );

  const calendar = createCalendar();

  return (
    <S.Container>
      <S.CalendarHeader>
        <Button variant="normal" onClick={handlePrevButtonClick} />
        <Text
          css={css`
            font-size: 28px;
            font-weight: 600;
          `}
        >
          {year}년 {month + 1}월
        </Text>
        <Button variant="normal" onClick={handleNextButtonClick} />
      </S.CalendarHeader>
      <S.CalendarBody>
        <div>
          {DAYS_OF_WEEK.map((day) => {
            return <S.DayOfWeek key={day}>{day}</S.DayOfWeek>;
          })}
        </div>
        <S.DateView>
          {calendar.map((week) => {
            return week.map((day) => {
              return <DateCell key={day.toISOString()} rawDate={day} />;
            });
          })}
        </S.DateView>
      </S.CalendarBody>
    </S.Container>
  );
};

export default Calendar;
