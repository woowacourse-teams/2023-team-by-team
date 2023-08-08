import Text from '~/components/common/Text/Text';
import * as S from './ScheduleBar.styled';
import type { GeneratedScheduleBar } from '~/types/schedule';
import { DoubleArrowRightIcon } from '~/assets/svg';
import { useTeamPlace } from '~/hooks/useTeamPlace';

export interface ScheduleBarProps extends GeneratedScheduleBar {
  onClick?: () => void;
}

const ScheduleBar = (props: ScheduleBarProps) => {
  const { title, onClick, roundedEnd, ...rest } = props;
  const { teamPlaceColor } = useTeamPlace();

  return (
    <S.Wrapper
      title={title}
      onClick={onClick}
      roundedEnd={roundedEnd}
      {...rest}
    >
      <S.Inner
        teamPlaceColor={teamPlaceColor}
        roundedEnd={roundedEnd}
        {...rest}
      >
        <Text as="span" css={S.scheduleBarTitle}>
          {title}
        </Text>
        {!roundedEnd && <DoubleArrowRightIcon />}
      </S.Inner>
    </S.Wrapper>
  );
};

export default ScheduleBar;
