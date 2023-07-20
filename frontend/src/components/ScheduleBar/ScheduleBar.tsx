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
  onScheduleModalOpen: () => void;
}

const ScheduleBar = (props: ScheduleBarProps) => {
  const { color = 'red', title, onScheduleModalOpen, ...rest } = props;
  return (
    <S.Wrapper
      color={color}
      title={title}
      onClick={onScheduleModalOpen}
      {...rest}
    />
  );
};

export default ScheduleBar;
