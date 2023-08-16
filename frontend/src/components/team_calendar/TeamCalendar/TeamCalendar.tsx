import { Fragment, useState } from 'react';
import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import DateCell from '~/components/common/DateCell/DateCell';
import ScheduleModal from '~/components/team_calendar/ScheduleModal/ScheduleModal';
import ScheduleBar from '~/components/team_calendar/ScheduleBar/ScheduleBar';
import ScheduleAddModal from '~/components/team_calendar/ScheduleAddModal/ScheduleAddModal';
import ScheduleEditModal from '~/components/team_calendar/ScheduleEditModal/ScheduleEditModal';
import * as S from './TeamCalendar.styled';
import useCalendar from '~/hooks/useCalendar';
import { useScheduleModal } from '~/hooks/schedule/useScheduleModal';
import { useFetchSchedules } from '~/hooks/queries/useFetchSchedules';
import { useModal } from '~/hooks/useModal';
import { generateScheduleBars } from '~/utils/generateScheduleBars';
import { DAYS_OF_WEEK, MODAL_OPEN_TYPE } from '~/constants/calendar';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from '~/assets/svg';
import { arrayOf } from '~/utils/arrayOf';
import ScheduleMoreCell from '~/components/team_calendar/ScheduleMoreCell/ScheduleMoreCell';
import type { Position, ModalOpenType } from '~/types/schedule';
import DailyScheduleModal from '~/components/team_calendar/DailyScheduleModal/DailyScheduleModal';
import { getDateByPosition } from '~/utils/getDateByPosition';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import type { CalendarSize } from '~/types/size';

interface TeamCalendarProps {
  calendarSize?: CalendarSize;
}

const TeamCalendar = (props: TeamCalendarProps) => {
  const { calendarSize = 'md' } = props;
  const { teamPlaceId } = useTeamPlace();
  const {
    year,
    month,
    calendar,
    currentDate,

    handlers: { handlePrevButtonClick, handleNextButtonClick },
  } = useCalendar();
  const schedules = useFetchSchedules(teamPlaceId, year, month);
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
      <S.Container calendarSize={calendarSize}>
        <S.CalendarHeader>
          <div />
          <S.ButtonContainer>
            <Button
              variant="plain"
              onClick={handlePrevButtonClick}
              aria-label="이전 달로 이동하기"
              css={S.arrowButton(calendarSize)}
            >
              <ArrowLeftIcon />
            </Button>
            <time>
              <Textweight="semiBold" css={S.calendarTitle(calendarSize)}>
                {year}년 {month + 1}월
              </Text>
            </time>
            <Button
              variant="plain"
              onClick={handleNextButtonClick}
              css={S.arrowButton(calendarSize)}
              aria-label="다음 달로 이동하기"
            >
              <ArrowRightIcon />
            </Button>
          </S.ButtonContainer>
          <Button
            css={S.scheduleAddButton(calendarSize)}
            onClick={handleScheduleAddButtonClick}
            aria-label="새로운 일정 등록하기"
          >
            <PlusIcon />
          </Button>
        </S.CalendarHeader>
        <div>
          <S.DaysOfWeek calendarSize={calendarSize}>
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
                        return arrayOf(duration).map((_, index) => {
                          const date = getDateByPosition(
                            year,
                            month,
                            row,
                            column + index,
                          );

                          return (
                            <ScheduleMoreCell
                              key={id + index}
                              calendarSize={calendarSize}
                              column={column + index}
                              onClick={() =>
                                handleDailyScheduleModalOpen(
                                  date,
                                  row,
                                  column + index,
                                )
                              }
                            />
                          );
                        });

                      if (row === rowIndex)
                        return (
                          <ScheduleBar
                            key={id}
                            calendarSize={calendarSize}
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
                  <S.DateView calendarSize={calendarSize}>
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
        <ScheduleAddModal clickedDate={clickedDate} />
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

export default TeamCalendar;
