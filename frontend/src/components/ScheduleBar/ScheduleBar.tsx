import * as S from './ScheduleBar.styled';

interface ScheduleBarProps {
  color: string;
}

const ScheduleBar = (props: ScheduleBarProps) => {
  const { color = 'red' } = props;

  return <S.Wrapper color={color} />;
};

export default ScheduleBar;
