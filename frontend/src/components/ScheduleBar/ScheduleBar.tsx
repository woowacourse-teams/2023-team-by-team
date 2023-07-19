import * as S from './ScheduleBar.styled';

export interface ScheduleBarProps {
  id: string;
  scheduleId: number;
  title: string;
  row: number;
  column: number;
  duration: number;
  level: number;
  color?: string;
}

const ScheduleBar = (props: ScheduleBarProps) => {
  const { color = 'red', title, ...rest } = props;

  return (
    <S.Wrapper
      color={color}
      title={title}
      {...rest}
      onClick={() => alert(title)}
    />
  );
};

export default ScheduleBar;
