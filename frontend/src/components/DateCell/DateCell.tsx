import { css } from 'styled-components';
import { parseDate } from '~/utils/parseDate';
import Text from '~/components/common/Text/Text';
import * as S from './DateCell.styled';
import type { DateCellSize } from '~/types/size';
import type { MouseEventHandler } from 'react';

interface DateCellProps {
  rawDate: Date;
  currentMonth: number;
  onClick?: () => void;
  onDayClick?: MouseEventHandler<HTMLDivElement>;
  size?: DateCellSize;
}

const DateCell = (props: DateCellProps) => {
  const { rawDate, currentMonth, size = 'lg', onClick, onDayClick } = props;
  const { date, day } = parseDate(rawDate);

  const isSunday = day === 0;
  const isSaturday = day === 6;
  const isCurrentMonth = rawDate.getMonth() === currentMonth;

  return (
    <S.Wrapper
      isSunday={isSunday}
      isSaturday={isSaturday}
      size={size}
      onClick={onClick}
    >
      <S.DateBadge onClick={onDayClick}>
        <Text css={S.dateText(isCurrentMonth, size)}>{date}</Text>
      </S.DateBadge>
    </S.Wrapper>
  );
};

export default DateCell;
