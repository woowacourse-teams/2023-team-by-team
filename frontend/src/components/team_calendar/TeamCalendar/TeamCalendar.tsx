import { Fragment, useState, useRef } from 'react';
import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import DateCell from '~/components/common/DateCell/DateCell';
import ScheduleModal from '~/components/team_calendar/ScheduleModal/ScheduleModal';
import ScheduleBar from '~/components/team_calendar/ScheduleBar/ScheduleBar';
import ScheduleAddModal from '~/components/team_calendar/ScheduleAddModal/ScheduleAddModal';
import ScheduleEditModal from '~/components/team_calendar/ScheduleEditModal/ScheduleEditModal';
import ScheduleMoreCell from '~/components/team_calendar/ScheduleMoreCell/ScheduleMoreCell';
import DailyScheduleModal from '~/components/team_calendar/DailyScheduleModal/DailyScheduleModal';
import ICalendarModal from '~/components/team_calendar/ICalendarModal/ICalendarModal';
import { useCalendar } from '~/hooks/useCalendar';
import { useScheduleModal } from '~/hooks/schedule/useScheduleModal';
import { useFetchSchedules } from '~/hooks/queries/useFetchSchedules';
import { useModal } from '~/hooks/useModal';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useCalendarResizePosition } from '~/hooks/useCalendarResizePosition';
import { usePrefetchSchedules } from '~/hooks/queries/usePrefetchSchedules';
import { useScheduleDragStatus } from '~/hooks/schedule/useScheduleBarDragStatus';
import { DAYS_OF_WEEK, MODAL_OPEN_TYPE } from '~/constants/calendar';
import { generateScheduleBars } from '~/utils/generateScheduleBars';
import { arrayOf } from '~/utils/arrayOf';
import { getDateByPosition } from '~/utils/getDateByPosition';
import { generateCalendarRangeByYearMonth } from '~/utils/generateCalendarRangeByYearMonth';
import type { Position, ModalOpenType } from '~/types/schedule';
import type { CalendarSize } from '~/types/size';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExportIcon,
  PlusIcon,
} from '~/assets/svg';
import * as S from './TeamCalendar.styled';
import { parseDate } from '~/utils/parseDate';
import CalendarDragScreen from '../CalendarDragScreen/CalendarDragScreen';
import Spacing from '~/components/common/Spacing/Spacing';

interface TeamCalendarProps {
  calendarSize?: CalendarSize;
}

const TeamCalendar = (props: TeamCalendarProps) => {
  const { calendarSize = 'md' } = props;

  const { dragStatus, handleDragStart, handleMouseUp } =
    useScheduleDragStatus();

  const { teamPlaceId } = useTeamPlace();
  const {
    year,
    month,
    calendar,
    currentDate,
    today,
    handlers: { handlePrevButtonClick, handleNextButtonClick },
  } = useCalendar();
  const { isModalOpen, openModal } = useModal();
  const {
    modalScheduleId,
    modalPosition,
    handlers: { handleScheduleModalOpen },
  } = useScheduleModal();

  const schedules = useFetchSchedules(
    teamPlaceId,
    generateCalendarRangeByYearMonth(year, month),
  );
  usePrefetchSchedules(
    teamPlaceId,
    generateCalendarRangeByYearMonth(
      month === 0 ? year - 1 : year,
      month === 0 ? 11 : month - 1,
    ),
  );
  usePrefetchSchedules(
    teamPlaceId,
    generateCalendarRangeByYearMonth(
      month === 11 ? year + 1 : year,
      month === 11 ? 0 : month + 1,
    ),
  );

  const [clickedDate, setClickedDate] = useState(currentDate);
  const [modalType, setModalType] = useState<ModalOpenType>(
    MODAL_OPEN_TYPE.ADD,
  );
  const [dailyModalDate, setDailyModalDate] = useState<Date>(new Date());
  const [dailyModalPosition, setDailyModalPosition] = useState<Position>({
    row: 0,
    column: 0,
  });
  const calendarRef = useRef<HTMLDivElement>(null);
  const { width, left } = useCalendarResizePosition(calendarRef);

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

  const handleExportButtonClick = () => {
    handleModalOpen(MODAL_OPEN_TYPE.EXPORT);
  };

  const getModal = (modalOpenType: ModalOpenType) => {
    if (modalOpenType === MODAL_OPEN_TYPE.ADD) {
      return (
        <ScheduleAddModal
          calendarSize={calendarSize}
          clickedDate={clickedDate}
        />
      );
    }

    if (modalOpenType === MODAL_OPEN_TYPE.VIEW) {
      return (
        <ScheduleModal
          calendarWidth={width}
          calendarLeft={left}
          calendarSize={calendarSize}
          scheduleId={modalScheduleId}
          position={modalPosition}
          onOpenScheduleEditModal={() => handleModalOpen(MODAL_OPEN_TYPE.EDIT)}
        />
      );
    }

    if (modalOpenType === MODAL_OPEN_TYPE.EDIT) {
      return (
        <ScheduleEditModal
          calendarSize={calendarSize}
          scheduleId={modalScheduleId}
          initialSchedule={schedules.find(
            (schedule) => schedule.id === modalScheduleId,
          )}
        />
      );
    }

    if (modalOpenType === MODAL_OPEN_TYPE.DAILY) {
      return (
        <DailyScheduleModal
          calendarWidth={width}
          calendarLeft={left}
          calendarSize={calendarSize}
          rawDate={dailyModalDate}
          position={dailyModalPosition}
          onScheduleModalOpen={handleScheduleModalOpen}
          onSetModalType={() => setModalType(() => MODAL_OPEN_TYPE.VIEW)}
        />
      );
    }

    if (modalOpenType === MODAL_OPEN_TYPE.EXPORT) {
      return <ICalendarModal calendarSize={calendarSize} />;
    }

    return null;
  };

  const modal = isModalOpen ? getModal(modalType) : null;

  return (
    <>
      <S.Container $calendarSize={calendarSize}>
        <S.CalendarHeader>
          <Spacing direction="horizontal" size={56} />
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
              <Text weight="semiBold" css={S.calendarTitle(calendarSize)}>
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
          <S.FeatureButtonContainer>
            <Button
              css={S.exportButton(calendarSize)}
              onClick={handleExportButtonClick}
              aria-label="일정 내보내기"
            >
              <ExportIcon />
            </Button>
            <Button
              css={S.scheduleAddButton(calendarSize)}
              onClick={handleScheduleAddButtonClick}
              aria-label="새로운 일정 등록하기"
            >
              <PlusIcon />
            </Button>
          </S.FeatureButtonContainer>
        </S.CalendarHeader>
        <div ref={calendarRef}>
          <S.DaysOfWeek $calendarSize={calendarSize}>
            {DAYS_OF_WEEK.map((day) => {
              return <S.DayOfWeek key={day}>{day}</S.DayOfWeek>;
            })}
          </S.DaysOfWeek>
          <S.CalendarGrid>
            {calendar.map((week, rowIndex) => {
              return (
                <Fragment key={rowIndex}>
                  <S.ScheduleBarContainer>
                    {scheduleBars.map((scheduleBar) => {
                      const {
                        id,
                        scheduleId,
                        row,
                        column,
                        level,
                        duration,
                        schedule,
                      } = scheduleBar;

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
                            onDragStart={(e) =>
                              handleDragStart(e, level, schedule)
                            }
                            {...scheduleBar}
                          />
                        );

                      return null;
                    })}
                  </S.ScheduleBarContainer>
                  <S.DateView $calendarSize={calendarSize}>
                    {week.map((day, colIndex) => {
                      const {
                        year: renderYear,
                        month: renderMonth,
                        date: renderDate,
                      } = parseDate(day);

                      const isToday =
                        today.year === renderYear &&
                        today.month === renderMonth &&
                        today.date === renderDate;

                      return (
                        <DateCell
                          key={day.toISOString()}
                          rawDate={day}
                          currentMonth={month}
                          isToday={isToday}
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
            <CalendarDragScreen
              calendarSize={calendarSize}
              year={year}
              month={month}
              dragStatus={dragStatus}
              onMouseUp={handleMouseUp}
            />
          </S.CalendarGrid>
        </div>
      </S.Container>
      {modal}
    </>
  );
};

export default TeamCalendar;
