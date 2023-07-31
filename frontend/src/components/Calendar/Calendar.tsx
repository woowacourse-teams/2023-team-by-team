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
import { arrayOf } from '~/utils/arrayOf';
import ScheduleMoreCell from '~/components/ScheduleMoreCell/ScheduleMoreCell';
import type { Position, ModalOpenType } from '~/types/schedule';
import DailyScheduleModal from '~/components/DailyScheduleModal/DailyScheduleModal';
import { getDateByPosition } from '~/utils/getDateByPosition';

const Calendar = () => {
  const {
    year,
    month,
    calendar,
    currentDate,

    handlers: { handlePrevButtonClick, handleNextButtonClick },
  } = useCalendar();
  const schedules = useFetchSchedules(1, year, month);
  const { isModalOpen, openModal } = useModal();
  const {
    modalScheduleId,
    modalPosition,
    handlers: { handleScheduleModalOpen },
  } = useScheduleModal();
  const [clickedDate, setClickedDate] = useState(currentDate);
  const [modalType, setModalType] = useState<ModalOpenType>(
    MODAL_OPEN_TYPE.ADD,
  );
  const [dailyModalDate, setDailyModalDate] = useState<Date>(new Date());
  const [dailyModalPosition, setDailyModalPosition] = useState<Position>({
    row: 0,
    column: 0,
  });
  const scheduleBars = generateScheduleBars(year, month, schedules);

  const handleModalOpen = (modalOpenType: ModalOpenType) => {
    setModalType(() => modalOpenType);
    openModal();
  };

  const handleDailyScheduleModalOpen = (
    day: Date,
    row: number,
    col: number,
  ) => {
    setModalType(() => MODAL_OPEN_TYPE.DAILY);
    setDailyModalDate(() => day);
    setDailyModalPosition({
      row,
      column: col,
    });
    openModal();
  };

  const handleDateCellClick = (clickedDate: Date) => {
    setClickedDate(() => clickedDate);
    handleModalOpen(MODAL_OPEN_TYPE.ADD);
  };

  const handleScheduleAddButtonClick = () => {
    setClickedDate(() => currentDate);
    handleModalOpen(MODAL_OPEN_TYPE.ADD);
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
              onClick={handleScheduleAddButtonClick}
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
                            onClick={() => {
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
                    {week.map((day, colIndex) => {
                      return (
                        <DateCell
                          key={day.toISOString()}
                          rawDate={day}
                          currentMonth={month}
                          onClick={() => {
                            handleDateCellClick(day);
                          }}
                          onDayClick={(e) => {
                            e.stopPropagation();
                            handleDailyScheduleModalOpen(
                              day,
                              rowIndex,
                              colIndex,
                            );
                          }}
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
        <ScheduleAddModal teamPlaceName="팀바팀" clickedDate={clickedDate} />
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
      {isModalOpen && modalType === MODAL_OPEN_TYPE.DAILY && (
        <DailyScheduleModal
          rawDate={dailyModalDate}
          position={dailyModalPosition}
          onScheduleModalOpen={handleScheduleModalOpen}
          onSetModalType={() => setModalType(() => MODAL_OPEN_TYPE.VIEW)}
        />
      )}
    </>
  );
};

export default Calendar;
