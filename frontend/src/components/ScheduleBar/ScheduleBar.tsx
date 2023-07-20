import * as S from './ScheduleBar.styled';

export interface ScheduleBar {
  id: string;
  scheduleId: number;
  title: string;
  row: number;
  column: number;
  duration: number;
  level: number;
  color?: string;
}

interface ScheduleBarProps extends ScheduleBar {
  handleClick: () => void;
}

const ScheduleBar = (props: ScheduleBarProps) => {
  const { color = 'red', title, handleClick, ...rest } = props;
  return (
    <S.Wrapper color={color} title={title} onClick={handleClick} {...rest} />
  );
};

export default ScheduleBar;
