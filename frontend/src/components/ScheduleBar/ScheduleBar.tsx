import Text from '~/components/common/Text/Text';
import * as S from './ScheduleBar.styled';
import type { Schedule } from '~/types/schedule';
import { DoubleArrowRightIcon } from '~/assets/svg';

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
  roundedStart: boolean;
  roundedEnd: boolean;
  onClick?: () => void;
}

const ScheduleBar = (props: ScheduleBarProps) => {
  const { color = '#516FFF', title, onClick, roundedEnd, ...rest } = props;

  return (
    <S.Wrapper
      color={color}
      title={title}
      onClick={onClick}
      roundedEnd={roundedEnd}
      {...rest}
    >
      <S.Inner color={color} roundedEnd={roundedEnd} {...rest}>
        <Text as="span" css={S.scheduleBarTitle}>
          {title}
        </Text>
        {!roundedEnd && <DoubleArrowRightIcon />}
      </S.Inner>
    </S.Wrapper>
  );
};

export default ScheduleBar;
