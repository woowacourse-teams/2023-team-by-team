import { Fragment, useState } from 'react';
import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import DateCell from '~/components/Calendar/DateCell/DateCell';
import ScheduleModal from '~/components/ScheduleModal/ScheduleModal';
import ScheduleBar from '~/components/ScheduleBar/ScheduleBar';
import ScheduleAddModal from '~/components/ScheduleAddModal/ScheduleAddModal';
import ScheduleEditModal from '~/components/ScheduleEditModal/ScheduleEditModal';
import * as S from './Calendar.styled';
import useCalendar from '~/hooks/useCalendar';
import { useScheduleModal } from '~/hooks/schedule/useScheduleModal';
import { useFetchSchedules } from '~/hooks/queries/useFetchSchedules';
import { useModal } from '~/hooks/useModal';
import { generateScheduleBars } from '~/utils/generateScheduleBars';
import { DAYS_OF_WEEK, MODAL_OPEN_TYPE } from '~/constants/calendar';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from '~/assets/svg';
import type { ModalOpenType } from '~/types/schedule';
import { ScheduleMoreCell } from '~/components/ScheduleMoreCell/ScheduleMoreCell';
import { arrayOf } from '~/utils/arrayOf';

const Calendar = () => {
  const {
    year,
    month,
    calendar,
    handlers: { handlePrevButtonClick, handleNextButtonClick },
  } = useCalendar();
  const schedules = useFetchSchedules(1, year, month + 1);
  const { isModalOpen, openModal } = useModal();
  const {
    modalScheduleId,
    modalPosition,
    handlers: { handleScheduleModalOpen },
  } = useScheduleModal();
  const [modalType, setModalType] = useState<ModalOpenType>(
    MODAL_OPEN_TYPE.ADD,
  );

  if (schedules === undefined) {
    return null;
  }
  const scheduleBars = generateScheduleBars(year, month, schedules);

  const handleModalOpen = (modalOpenType: ModalOpenType) => {
    setModalType(() => modalOpenType);
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
            <Button
              css={S.scheduleAddButton}
              onClick={() => handleModalOpen(MODAL_OPEN_TYPE.ADD)}
            >
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
                <Fragment key={rowIndex}>
                  <S.ScheduleBarContainer>
                    {scheduleBars.map((scheduleBar) => {
                      const { id, scheduleId, row, column, level, duration } =
                        scheduleBar;
                      if (row === rowIndex && level > 2)
                        return arrayOf(duration).map((_, index) => (
                          <ScheduleMoreCell
                            key={id + index}
                            column={column + index}
                          />
                        ));

                      if (row === rowIndex)
                        return (
                          <ScheduleBar
                            key={id}
                            onScheduleModalOpen={() => {
                              setModalType(() => MODAL_OPEN_TYPE.VIEW);
                              handleScheduleModalOpen({
                                scheduleId,
                                row,
                                column,
                                level,
                              });
                            }}
                            {...scheduleBar}
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
                          onClick={() => handleModalOpen(MODAL_OPEN_TYPE.ADD)}
                        />
                      );
                    })}
                  </S.DateView>
                </Fragment>
              );
            })}
          </div>
        </div>
      </S.Container>
      {isModalOpen && modalType === MODAL_OPEN_TYPE.ADD && (
        <ScheduleAddModal teamPlaceName="팀바팀" />
      )}
      {isModalOpen && modalType === MODAL_OPEN_TYPE.VIEW && (
        <ScheduleModal
          scheduleId={modalScheduleId}
          position={modalPosition}
          onOpenScheduleEditModal={() => handleModalOpen(MODAL_OPEN_TYPE.EDIT)}
        />
      )}
      {isModalOpen && modalType === MODAL_OPEN_TYPE.EDIT && (
        <ScheduleEditModal
          teamPlaceName="팀바팀"
          scheduleId={modalScheduleId}
          initialSchedule={schedules.find(
            (schedule) => schedule.id === modalScheduleId,
          )}
        />
      )}
    </>
  );
};

export default Calendar;
