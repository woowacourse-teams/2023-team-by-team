import { parseDate } from '~/utils/parseDate';
import Text from '~/components/common/Text/Text';
import * as S from './DateCell.styled';
import type { DateCellSize } from '~/types/size';
import type { MouseEventHandler } from 'react';

export interface DateCellProps {
  rawDate: Date;
  currentMonth: number;
  size?: DateCellSize;
  isToday?: boolean;
  onClick?: () => void;
  onDayClick?: MouseEventHandler<HTMLDivElement>;
}

const DateCell = (props: DateCellProps) => {
  const {
    rawDate,
    currentMonth,
    size = 'lg',
    isToday = false,
    onClick,
    onDayClick,
  } = props;
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
      <S.DateBadge
        isCurrentMonth={isCurrentMonth}
        onClick={onDayClick}
        isToday={isToday}
      >
        <Text
          css={S.dateText(isCurrentMonth, isToday, isSaturday, isSunday, size)}
        >
          {date}
        </Text>
      </S.DateBadge>
    </S.Wrapper>
  );
};

export default DateCell;
