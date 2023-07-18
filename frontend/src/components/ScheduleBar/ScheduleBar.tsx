import * as S from './ScheduleBar.styled';

export interface ScheduleBarProps {
  startPosition: number;
  duration: number;
  color?: string;
}

const ScheduleBar = (props: ScheduleBarProps) => {
  const { startPosition, duration, color = 'red' } = props;

  return (
    <S.Wrapper
      startPosition={startPosition}
      duration={duration}
      color={color}
    />
  );
};

export default ScheduleBar;
