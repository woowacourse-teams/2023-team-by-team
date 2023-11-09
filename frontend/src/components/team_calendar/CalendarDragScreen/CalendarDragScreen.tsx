import * as S from './CalendarDragScreen.styled';
import { useRef } from 'react';
import FakeScheduleBarsScreen from '~/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen';
import type { Schedule } from '~/types/schedule';
import type { CalendarSize } from '~/types/size';
import { useCalendarDragScreen } from './useCalendarDragScreen';

interface CalendarDragScreenProps {
  visible: boolean;
  initX: number;
  initY: number;
  calendarSize: CalendarSize;
  year: number;
  month: number;
  level: number;
  schedule: Schedule;
  onMouseUp: () => void;
}

const CalendarDragScreen = (props: CalendarDragScreenProps) => {
  const {
    visible,
    initX,
    initY,
    calendarSize,
    year,
    month,
    level,
    schedule,
    onMouseUp,
  } = props;
  const calendarRef = useRef<HTMLDivElement>(null);
  const { movingScheduleBars, scheduleBarsIndicator, relativeX, relativeY } =
    useCalendarDragScreen({
      visible,
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
    <S.Container $visible={visible} ref={calendarRef}>
      <FakeScheduleBarsScreen
        mode="indicator"
        scheduleBars={scheduleBarsIndicator}
      />
      <FakeScheduleBarsScreen
        mode="schedule"
        scheduleBars={movingScheduleBars}
        relativeX={relativeX}
        relativeY={relativeY}
      />
    </S.Container>
  );
};

export default CalendarDragScreen;
