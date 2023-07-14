import { css } from 'styled-components';
import { parseDate } from '~/utils/parseDate';
import Text from '~/components/common/Text/Text';
import * as S from './DateCell.styled';

interface DateCellProps {
  rawDate: Date;
}

const currentMonth = new Date().getMonth();

const DateCell = (props: DateCellProps) => {
  const { rawDate } = props;
  const { date, day } = parseDate(rawDate);

  const isSunday = day === 0;
  const isSaturday = day === 6;
  const isCurrentMonth = rawDate.getMonth() === currentMonth;

  return (
    <S.Wrapper isSunday={isSunday} isSaturday={isSaturday}>
      <Text
        css={css`
          opacity: ${isCurrentMonth ? 1 : 0.3};
        `}
      >
        {date}
      </Text>
    </S.Wrapper>
  );
};

export default DateCell;
