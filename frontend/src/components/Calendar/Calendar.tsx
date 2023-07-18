import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import DateCell from '~/components/Calendar/DateCell/DateCell';
import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/svg';
import useCalendar from '~/hooks/useCalendar';
import * as S from './Calendar.styled';
import ScheduleBar from '~/components/ScheduleBar/ScheduleBar';
import type { Schedule } from '~/types/schedule';

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'] as const;

interface CalendarProps {
  schedules: Schedule[];
}

const Calendar = (props: CalendarProps) => {
  const { schedules } = props;
  const {
    year,
    month,
    calendar,

    handlers: { handlePrevButtonClick, handleNextButtonClick },
  } = useCalendar();

  return (
    <>
      <S.CalendarHeader>
        <Button
          variant="plain"
          onClick={handlePrevButtonClick}
          aria-label="이전 달로 이동하기"
        >
          <ArrowLeftIcon />
        </Button>
        <Text css={S.calendarTitle}>
          {year}년 {month + 1}월
        </Text>
        <Button
          variant="plain"
          onClick={handleNextButtonClick}
          aria-label="다음 달로 이동하기"
        >
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
                <S.ScheduleBarContainer>
                  {schedules.map((schedule) => {
                    const { id, title, startDateTime, endDateTime } = schedule;

                    const calcDuration = (start: Date, end: Date) => {
                      const diff = start.getTime() - end.getTime();

                      return Math.abs(diff / (1000 * 60 * 60 * 24)) + 1;
                    };

                    const [startDate] = startDateTime.split(' ');
                    const [endDate] = endDateTime.split(' ');

                    const duration = calcDuration(
                      new Date(startDate),
                      new Date(endDate),
                    );

                    return (
                      <ScheduleBar
                        key={id}
                        startPosition={new Date(startDate).getDay()}
                        duration={duration}
                      />
                    );
                  })}
                </S.ScheduleBarContainer>
              </>
            );
          })}
        </S.DateContainer>
      </S.CalendarBody>
    </>
  );
};

export default Calendar;
