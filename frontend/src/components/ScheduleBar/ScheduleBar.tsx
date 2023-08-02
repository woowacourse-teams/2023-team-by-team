import Text from '~/components/common/Text/Text';
import * as S from './ScheduleBar.styled';
import type { Schedule } from '~/types/schedule';

export interface ScheduleBarProps {
  id: string;
  scheduleId: number;
  schedule: Schedule;
  title: string;
  row: number;
  column: number;
  duration: number;
  level: number;
  color?: string;
  onClick?: () => void;
}

const ScheduleBar = (props: ScheduleBarProps) => {
  const { color = '#516FFF', title, onClick, ...rest } = props;

  return (
    <S.Wrapper color={color} title={title} onClick={onClick} {...rest}>
      <S.Inner color={color} {...rest}>
        <Text as="span" css={S.scheduleBarTitle}>
          {title}
        </Text>
      </S.Inner>
    </S.Wrapper>
  );
};

export default ScheduleBar;
