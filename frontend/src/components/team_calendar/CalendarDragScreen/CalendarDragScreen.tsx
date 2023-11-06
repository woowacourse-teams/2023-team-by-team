import * as S from './CalendarDragScreen.styled';
import MovingScheduleBars from '~/components/team_calendar/MovingScheduleBars/MovingScheduleBars';
import type { Schedule } from '~/types/schedule';
import { useCalendarDragScreen } from './useCalendarDragScreen';

interface CalendarDragScreenProps {
  visible: boolean;
  year: number;
  month: number;
  level: number;
  schedule: Schedule;
  initMouseX: number;
  initMouseY: number;
  onMouseUp: () => void;
}

const CalendarDragScreen = (props: CalendarDragScreenProps) => {
  const {
    visible,
    year,
    month,
    level,
    schedule,
    initMouseX,
    initMouseY,
    onMouseUp,
  } = props;
  const { movingScheduleBars, relativeX, relativeY } = useCalendarDragScreen({
    visible,
    onMouseUp,
    year,
    month,
    level,
    schedule,
    initMouseX,
    initMouseY,
  });

  return visible ? (
    <S.Container>
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
