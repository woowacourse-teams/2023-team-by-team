import * as S from './ScheduleMoreCell.styled';
import type { Position } from '~/types/schedule';
import Text from '~/components/common/Text/Text';
import type { CalendarSize } from '~/types/size';

export interface ScheduleMoreCellProps extends Pick<Position, 'column'> {
  calendarSize?: CalendarSize;
  onClick?: () => void;
}

const ScheduleMoreCell = (props: ScheduleMoreCellProps) => {
  const { column, onClick, calendarSize = 'md' } = props;
  return (
    <S.Wrapper column={column} calendarSize={calendarSize} onClick={onClick}>
      <Text size="xs" css={S.moreText}>
        일정 더보기
      </Text>
    </S.Wrapper>
  );
};

export default ScheduleMoreCell;
