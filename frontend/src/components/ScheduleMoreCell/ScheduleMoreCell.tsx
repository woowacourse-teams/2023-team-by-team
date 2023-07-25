import * as S from './ScheduleMoreCell.styled';
import type { Position } from '~/types/schedule';
import Text from '~/components/common/Text/Text';

interface ScheduleMoreCellProps extends Pick<Position, 'column'> {
  onClick?: () => void;
}

const ScheduleMoreCell = (props: ScheduleMoreCellProps) => {
  const { column } = props;
  return (
    <S.Wrapper column={column}>
      <Text size="xs" css={S.moreText}>
        일정 더보기
      </Text>
    </S.Wrapper>
  );
};

export default ScheduleMoreCell;
