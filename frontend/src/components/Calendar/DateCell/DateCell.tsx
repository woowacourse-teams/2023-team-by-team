import { css } from 'styled-components';
import { parseDate } from '~/utils/parseDate';
import Text from '~/components/common/Text/Text';
import * as S from './DateCell.styled';
import type { DateCellSize } from '~/types/size';

interface DateCellProps {
  rawDate: Date;
  currentMonth: number;
  size?: DateCellSize;
}

const DateCell = (props: DateCellProps) => {
  const { rawDate, currentMonth, size = 'lg' } = props;
  const { date, day } = parseDate(rawDate);

  const isSunday = day === 0;
  const isSaturday = day === 6;
  const isCurrentMonth = rawDate.getMonth() === currentMonth;

  return (
    <S.Wrapper isSunday={isSunday} isSaturday={isSaturday} size={size}>
      <Text
        css={css`
          font-size: 12px;
          opacity: ${isCurrentMonth ? 1 : 0.3};
        `}
      >
        {date}
      </Text>
    </S.Wrapper>
  );
};

export default DateCell;
