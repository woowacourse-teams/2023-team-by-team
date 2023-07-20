import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import DateCell from '~/components/Calendar/DateCell/DateCell';
import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/svg';
import useCalendar from '~/hooks/useCalendar';
import * as S from './Calendar.styled';
import ScheduleBar from '~/components/ScheduleBar/ScheduleBar';
import type { Schedule, SchedulePosition } from '~/types/schedule';
import { generateScheduleBars } from '~/utils/generateScheduleBars';
import { useModal } from '~/hooks/useModal';
import { useEffect, useState } from 'react';
import ScheduleModal from '~/components/ScheduleModal/ScheduleModal';
import { useFetchScheduleById } from '~/hooks/queries/useFetchScheduleById';
import { useDeleteSchedule } from '~/hooks/queries/useDeleteSchedule';

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

  const { openModal, closeModal } = useModal();
  const scheduleBars = generateScheduleBars(year, month, schedules);

  const [modalScheduleId, setModalScheduleId] = useState<number>(
    scheduleBars[0].scheduleId,
  );

  const { scheduleById } = useFetchScheduleById(1, modalScheduleId);
  const { mutateScheduleDelete } = useDeleteSchedule(1, modalScheduleId);
  const [modalPosition, setModalPosition] = useState<SchedulePosition>({
    row: 0,
    column: 0,
    level: 0,
  });

  useEffect(() => {
    setModalScheduleId(scheduleBars[0].scheduleId);
  }, []);
  const handleScheduleModalOpen = (
    scheduleId: number,
    row: number,
    column: number,
    level: number,
  ) => {
    setModalScheduleId(scheduleId);
    setModalPosition({ row, column, level });
    openModal();
  };

  const onScheduleDelete = () => {
    closeModal();
    mutateScheduleDelete();
  };

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
                          handleClick={() =>
                            handleScheduleModalOpen(
                              scheduleId,
                              row,
                              column,
                              level,
                            )
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
          handleScheduleDelete={onScheduleDelete}
        />
      )}
    </>
  );
};

export default Calendar;
