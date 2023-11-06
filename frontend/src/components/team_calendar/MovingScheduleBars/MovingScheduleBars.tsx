import * as S from './MovingScheduleBars.styled';
import ScheduleBar from '~/components/team_calendar/ScheduleBar/ScheduleBar';
import { arrayOf } from '~/utils/arrayOf';
import type { GeneratedScheduleBar } from '~/types/schedule';

interface MovingScheduleBarProps {
  scheduleBars: GeneratedScheduleBar[];
  relativeX: number;
  relativeY: number;
}

const MovingScheduleBar = (props: MovingScheduleBarProps) => {
  const { scheduleBars, relativeX, relativeY } = props;

  return (
    <S.Container $relativeX={relativeX} $relativeY={relativeY}>
      {arrayOf(6).map((_, rowIndex) => (
        <S.CalendarRow key={rowIndex}>
          {scheduleBars.map((scheduleBar) => {
            return scheduleBar.row === rowIndex ? (
              <ScheduleBar key={scheduleBar.id} {...scheduleBar} />
            ) : null;
          })}
        </S.CalendarRow>
      ))}
    </S.Container>
  );
};

export default MovingScheduleBar;
