import * as S from './ScheduleBarsIndicator.styled';
import ScheduleBar from '~/components/team_calendar/ScheduleBar/ScheduleBar';
import { arrayOf } from '~/utils/arrayOf';
import type { GeneratedScheduleBar } from '~/types/schedule';

interface ScheduleBarsIndicator {
  scheduleBars: GeneratedScheduleBar[];
}

const ScheduleBarsIndicator = (props: ScheduleBarsIndicator) => {
  const { scheduleBars } = props;

  return (
    <S.Container>
      {arrayOf(6).map((_, rowIndex) => (
        <S.CalendarRow key={rowIndex}>
          {scheduleBars.map((scheduleBar) => {
            return scheduleBar.row === rowIndex ? (
              <ScheduleBar
                key={scheduleBar.id}
                {...scheduleBar}
                mode="indicator"
              />
            ) : null;
          })}
        </S.CalendarRow>
      ))}
    </S.Container>
  );
};

export default ScheduleBarsIndicator;
