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
  const isInteractable = mode === 'normal';

  return (
    <S.Wrapper
      title={isInteractable ? title : undefined}
      onClick={onClick}
      onDragStart={onDragStart}
      roundedEnd={roundedEnd}
      calendarSize={calendarSize}
      draggable={isInteractable}
      mode={mode}
      {...rest}
    >
      <S.Inner
        teamPlaceColor={teamPlaceColor}
        roundedEnd={roundedEnd}
        mode={mode}
        {...rest}
      >
        {mode !== 'indicator' && (
          <Text as="span" css={S.scheduleBarTitle(calendarSize)}>
            {title}
          </Text>
        )}
        {!roundedEnd && <DoubleArrowRightIcon />}
      </S.Inner>
    </S.Wrapper>
  );
};

export default ScheduleBar;
