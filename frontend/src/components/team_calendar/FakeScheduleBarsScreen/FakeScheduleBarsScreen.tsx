import * as S from './FakeScheduleBarsScreen.styled';
import ScheduleBar from '~/components/team_calendar/ScheduleBar/ScheduleBar';
import { arrayOf } from '~/utils/arrayOf';
import type { GeneratedScheduleBar } from '~/types/schedule';

interface ScheduleModeProps {
  mode: 'schedule';
  scheduleBars: GeneratedScheduleBar[];
  relativeX: number;
  relativeY: number;
}

interface IndicatorModeProps {
  mode: 'indicator';
  scheduleBars: GeneratedScheduleBar[];
}

type FakeScheduleBarsScreenProps = ScheduleModeProps | IndicatorModeProps;

const FakeScheduleBarsScreen = (props: FakeScheduleBarsScreenProps) => {
  const { mode, scheduleBars } = props;

  return (
    <S.Container
      $relativeX={mode === 'schedule' ? props.relativeX : 0}
      $relativeY={mode === 'schedule' ? props.relativeY : 0}
    >
      {arrayOf(6).map((_, rowIndex) => (
        <S.CalendarRow key={rowIndex}>
          {scheduleBars.map((scheduleBar) => {
            return scheduleBar.row === rowIndex ? (
              <ScheduleBar
                key={scheduleBar.id}
                {...scheduleBar}
                mode={mode === 'schedule' ? 'no-interaction' : 'indicator'}
              />
            ) : null;
          })}
        </S.CalendarRow>
      ))}
    </S.Container>
  );
};

export default FakeScheduleBarsScreen;
