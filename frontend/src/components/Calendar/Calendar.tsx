import { css } from 'styled-components';
import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import DateCell from '~/components/Calendar/DateCell/DateCell';
import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/svg';
import * as S from './Calendar.styled';
import useCalendar from '~/hooks/useCalendar';

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'] as const;

const Calendar = () => {
  const {
    year,
    month,
    calendar,

    handlers: { handlePrevButtonClick, handleNextButtonClick },
  } = useCalendar();

  return (
    <S.Container>
      <S.CalendarHeader>
        <Button variant="plain" onClick={handlePrevButtonClick}>
          <ArrowLeftIcon />
        </Button>
        <Text
          css={css`
            font-size: 28px;
            font-weight: 600;
          `}
        >
          {year}년 {month + 1}월
        </Text>
        <Button variant="plain" onClick={handleNextButtonClick}>
          <ArrowRightIcon />
        </Button>
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
              return (
                <DateCell
                  key={day.toISOString()}
                  rawDate={day}
                  currentMonth={month}
                />
              );
            });
          })}
        </S.DateView>
      </S.CalendarBody>
    </S.Container>
  );
};

export default Calendar;
