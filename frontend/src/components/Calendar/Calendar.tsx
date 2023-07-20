import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import DateCell from '~/components/Calendar/DateCell/DateCell';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from '~/assets/svg';
import useCalendar from '~/hooks/useCalendar';
import * as S from './Calendar.styled';
import ScheduleBar from '~/components/ScheduleBar/ScheduleBar';
import { generateScheduleBars } from '~/utils/generateScheduleBars';
import ScheduleModal from '~/components/ScheduleModal/ScheduleModal';
import { useScheduleModal } from '~/hooks/schedule/useScheduleModal';
import { useModal } from '~/hooks/useModal';
import { DAYS_OF_WEEK, MODAL_TYPE } from '~/constants/calendar';
import ScheduleAddModal from '~/components/ScheduleAddModal/ScheduleAddModal';
import { useFetchSchedules } from '~/hooks/queries/useFetchSchedules';
import { useState } from 'react';
import type { Modal } from '~/types/schedule';

const Calendar = () => {
  const {
    year,
    month,
    calendar,
    handlers: { handlePrevButtonClick, handleNextButtonClick },
  } = useCalendar();
  const { schedules } = useFetchSchedules(1, year, month);
  const { isModalOpen, openModal } = useModal();
  const {
    modalScheduleId,
    modalPosition,
    handlers: { handleScheduleModalOpen },
  } = useScheduleModal();

  const [modalType, setModalType] = useState<Modal>(MODAL_TYPE.ADD);

  if (schedules === undefined) {
    return null;
  }
  const scheduleBars = generateScheduleBars(year, month, schedules);

  const handleAddModalOpen = () => {
    setModalType(MODAL_TYPE.ADD);
    openModal();
  };

  return (
    <>
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
            <Button css={S.scheduleAddButton} onClick={handleAddModalOpen}>
              <PlusIcon />
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
                            onScheduleModalOpen={() => {
                              setModalType(MODAL_TYPE.VIEW);
                              handleScheduleModalOpen({
                                scheduleId,
                                row,
                                column,
                                level,
                              });
                            }}
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
                          onClick={handleAddModalOpen}
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
      {isModalOpen && modalType === MODAL_TYPE.ADD && (
        <ScheduleAddModal teamPlaceName="팀바팀" />
      )}
      {isModalOpen && modalType === MODAL_TYPE.VIEW && (
        <ScheduleModal scheduleId={modalScheduleId} position={modalPosition} />
      )}
    </>
  );
};

export default Calendar;
