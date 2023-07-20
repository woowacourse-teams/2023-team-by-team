import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import DateCell from '~/components/Calendar/DateCell/DateCell';
import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/svg';
import useCalendar from '~/hooks/useCalendar';
import * as S from './Calendar.styled';
import ScheduleBar from '~/components/ScheduleBar/ScheduleBar';
import type { Schedule } from '~/types/schedule';
import { generateScheduleBars } from '~/utils/generateScheduleBars';
import ScheduleModal from '~/components/ScheduleModal/ScheduleModal';
import { useScheduleModal } from '~/hooks/schedule/useScheduleModal';

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
  const scheduleBars = generateScheduleBars(year, month, schedules);
  const {
    modalPosition,
    scheduleById,
    handlers: { onScheduleModalOpen, onScheduleDelete },
  } = useScheduleModal(scheduleBars);

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
          {calendar.map((week, rowIndex) => {
            return (
              <>
                <S.ScheduleBarContainer>
                  {scheduleBars.map((scheduleBar, index) => {
                    const { id, row, column, level, scheduleId, ...rest } =
                      scheduleBar;
                    if (row === rowIndex)
                      return (
                        <ScheduleBar
                          id={id}
                          scheduleId={scheduleId}
                          row={row}
                          column={column}
                          level={level}
                          onScheduleModalOpen={() =>
                            onScheduleModalOpen(scheduleId, row, column, level)
                          }
                          {...rest}
                        />
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
        </S.DateContainer>
      </S.CalendarBody>
      {scheduleById && (
        <ScheduleModal
          schedule={scheduleById}
          position={modalPosition}
          onScheduleDelete={onScheduleDelete}
        />
      )}
    </>
  );
};

export default Calendar;
