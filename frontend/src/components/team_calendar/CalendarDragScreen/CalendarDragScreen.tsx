import * as S from './CalendarDragScreen.styled';
import { useRef } from 'react';
import MovingScheduleBars from '~/components/team_calendar/MovingScheduleBars/MovingScheduleBars';
import type { Schedule } from '~/types/schedule';
import type { CalendarSize } from '~/types/size';
import { useCalendarDragScreen } from './useCalendarDragScreen';

interface CalendarDragScreenProps {
  visible: boolean;
  calendarSize: CalendarSize;
  year: number;
  month: number;
  level: number;
  schedule: Schedule;
  onMouseUp: () => void;
}

const CalendarDragScreen = (props: CalendarDragScreenProps) => {
  const { visible, calendarSize, year, month, level, schedule, onMouseUp } =
    props;
  const calendarRef = useRef<HTMLDivElement>(null);
  const { movingScheduleBars, relativeX, relativeY } = useCalendarDragScreen({
    visible,
    calendarRef,
    calendarSize,
    onMouseUp,
    year,
    month,
    level,
    schedule,
  });

  return visible ? (
    <S.Container ref={calendarRef}>
      <MovingScheduleBars
        scheduleBars={movingScheduleBars}
        relativeX={relativeX}
        relativeY={relativeY}
      />
      {/* <ScheduleBarIndicator schedule={schedule} /> */}
    </S.Container>
  ) : null;
};

export default CalendarDragScreen;
