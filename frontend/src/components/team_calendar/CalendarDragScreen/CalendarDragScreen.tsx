import * as S from './CalendarDragScreen.styled';
import { useRef } from 'react';
import FakeScheduleBarsScreen from '~/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen';
import type { YYYYMMDDHHMM, DragStatus } from '~/types/schedule';
import type { CalendarSize } from '~/types/size';
import { useCalendarDragScreen } from '~/hooks/schedule/useCalendarDragScreen';

interface CalendarDragScreenProps {
  calendarSize: CalendarSize;
  year: number;
  month: number;
  dragStatus: DragStatus;
  onMouseUp: (
    title: string,
    startDateTime: YYYYMMDDHHMM,
    endDateTime: YYYYMMDDHHMM,
    shouldUpdate: boolean,
  ) => void;
}

const CalendarDragScreen = (props: CalendarDragScreenProps) => {
  const { calendarSize, year, month, dragStatus, onMouseUp } = props;
  const { isDragging, level, schedule, initX, initY } = dragStatus;
  const calendarRef = useRef<HTMLDivElement>(null);
  const { scheduleBars, relativeX, relativeY } = useCalendarDragScreen({
    isDragging,
    initX,
    initY,
    calendarRef,
    calendarSize,
    onMouseUp,
    year,
    month,
    level,
    schedule,
  });

  return (
    <S.Container $isDragging={isDragging} ref={calendarRef}>
      <FakeScheduleBarsScreen mode="indicator" scheduleBars={scheduleBars} />
      <FakeScheduleBarsScreen
        mode="schedule"
        scheduleBars={scheduleBars}
        relativeX={relativeX}
        relativeY={relativeY}
      />
    </S.Container>
  );
};

export default CalendarDragScreen;
