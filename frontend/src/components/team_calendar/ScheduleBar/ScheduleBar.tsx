import Text from '~/components/common/Text/Text';
import * as S from './ScheduleBar.styled';
import type { GeneratedScheduleBar } from '~/types/schedule';
import { DoubleArrowRightIcon } from '~/assets/svg';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import type { MouseEvent } from 'react';
import type { CalendarSize } from '~/types/size';

export interface ScheduleBarProps extends GeneratedScheduleBar {
  calendarSize?: CalendarSize;
  onClick?: () => void;
  onDragStart?: (e: MouseEvent) => void;
}

const ScheduleBar = (props: ScheduleBarProps) => {
  const {
    title,
    onClick,
    roundedEnd,
    onDragStart,
    mode = 'normal',
    calendarSize = 'md',
    ...rest
  } = props;
  const { teamPlaceColor } = useTeamPlace();
  const isInteractive = mode === 'normal';
  const isIndicator = mode === 'indicator';

  return (
    <S.Wrapper
      title={isInteractive ? title : undefined}
      onClick={onClick}
      onDragStart={onDragStart}
      roundedEnd={roundedEnd}
      calendarSize={calendarSize}
      draggable={isInteractive}
      mode={mode}
      {...rest}
    >
      <S.Inner
        teamPlaceColor={teamPlaceColor}
        roundedEnd={roundedEnd}
        mode={mode}
        {...rest}
      >
        {!isIndicator && (
          <Text as="span" css={S.scheduleBarTitle(calendarSize)}>
            {title}
          </Text>
        )}
        {!roundedEnd && !isIndicator && <DoubleArrowRightIcon />}
      </S.Inner>
    </S.Wrapper>
  );
};

export default ScheduleBar;
