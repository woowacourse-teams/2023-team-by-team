import { css } from 'styled-components';
import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import DateCell from '~/components/Calendar/DateCell/DateCell';
import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/svg';
import useCalendar from '~/hooks/useCalendar';
import * as S from './Calendar.styled';

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'] as const;

const Calendar = () => {
  const {
    year,
    month,
    calendar,

    handlers: { handlePrevButtonClick, handleNextButtonClick },
  } = useCalendar();

  return (
    <>
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
        <S.DaysOfWeek>
          {DAYS_OF_WEEK.map((day) => {
            return <S.DayOfWeek key={day}>{day}</S.DayOfWeek>;
          })}
        </S.DaysOfWeek>
        <S.DateContainer>
          {calendar.map((week) => {
            return (
              <>
                <S.DateView>
                  {week.map((day) => {
                    return (
                      <DateCell
                        key={day.toISOString()}
                        rawDate={day}
                        currentMonth={month}
                      />
                    );
                  })}
                </S.DateView>
                <S.ScheduleBarContainer></S.ScheduleBarContainer>
              </>
            );
          })}
        </S.DateContainer>
      </S.CalendarBody>
    </>
  );
};

export default Calendar;
