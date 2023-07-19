import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import DateCell from '~/components/Calendar/DateCell/DateCell';
import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/svg';
import useCalendar from '~/hooks/useCalendar';
import * as S from './Calendar.styled';
import ScheduleBar from '~/components/ScheduleBar/ScheduleBar';
import { generateScheduleBars } from '~/utils/generateScheduleBars';
import { useSchedules } from '~/hooks/queries/useSchedules';
import { DAYS_OF_WEEK } from '~/constants/calendar';

const Calendar = () => {
  const {
    year,
    month,
    calendar,

    handlers: { handlePrevButtonClick, handleNextButtonClick },
  } = useCalendar();
  const { schedules } = useSchedules(1, year, month);

  if (schedules === undefined) {
    return null;
  }

  const scheduleBars = generateScheduleBars(year, month, schedules);

  return (
    <S.Container>
      <S.CalendarHeader>
        <S.ButtonContainer>
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
        </S.ButtonContainer>
      </S.CalendarHeader>
      <div>
        <S.DaysOfWeek>
          {DAYS_OF_WEEK.map((day) => {
            return <S.DayOfWeek key={day}>{day}</S.DayOfWeek>;
          })}
        </S.DaysOfWeek>
        <div>
          {calendar.map((week, rowIndex) => {
            return (
              <>
                <S.ScheduleBarContainer>
                  {scheduleBars.map((scheduleBar) => {
                    const { id, row, ...rest } = scheduleBar;

                    if (row === rowIndex)
                      return (
                        <ScheduleBar key={id} id={id} row={row} {...rest} />
                      );

                    return null;
                  })}
                </S.ScheduleBarContainer>
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
              </>
            );
          })}
        </div>
      </div>
    </S.Container>
  );
};

export default Calendar;
