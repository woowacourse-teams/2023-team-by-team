import { parseDate } from '~/utils/parseDate';
import * as S from './DateCell.styled';

interface DateCellProps {
  rawDate: Date;
}

const DateCell = (props: DateCellProps) => {
  const { rawDate } = props;
  const { date, day } = parseDate(rawDate);

  const isSunday = day === 0;
  const isSaturday = day === 6;

  return (
    <S.Wrapper isSunday={isSunday} isSaturday={isSaturday}>
      {date}
    </S.Wrapper>
  );
};

export default DateCell;
