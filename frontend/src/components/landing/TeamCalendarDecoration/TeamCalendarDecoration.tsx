import * as S from './TeamCalendarDecoration.styled';
import Text from '~/components/common/Text/Text';
import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/svg';
import { mousePointer } from '~/assets/png';
import { CELL_COUNT } from '~/constants/landing';
import { parseDate } from '~/utils/parseDate';

interface TeamCalendarDecorationProps {
  animation?: boolean;
}

const TeamCalendarDecoration = (props: TeamCalendarDecorationProps) => {
  const { animation = true } = props;
  const { year, month } = parseDate(new Date());
  const YYYYMM = `${year}-${String(month + 1).padStart(2, '0')}`;

  return (
    <S.Container>
      <S.TeamBadge />
      <S.CalendarHeaderContainer>
        <ArrowLeftIcon />
        <Text css={S.calendarHeaderText}>{YYYYMM}</Text>
        <ArrowRightIcon />
      </S.CalendarHeaderContainer>
      <S.CalendarContainer>
        <S.CalendarTable>
          {Array.from({ length: CELL_COUNT }).map((_, index) => (
            <S.CalendarCell key={index} />
          ))}
        </S.CalendarTable>
        <S.CalendarBarContainer>
          <S.CalendarBar
            row={0}
            column={0}
            length={4}
            level={0}
            roundedStart={true}
            roundedEnd={true}
            color="#193ecb"
          />
          <S.CalendarBar
            row={0}
            column={2}
            length={4}
            level={1}
            roundedStart={true}
            roundedEnd={true}
            color="#7c25ff"
          />
          <S.CalendarBar
            row={2}
            column={2}
            length={5}
            level={0}
            roundedStart={true}
            roundedEnd={false}
            color="#2546ff"
          />
          <S.CalendarBar
            row={3}
            column={0}
            length={7}
            level={0}
            roundedStart={false}
            roundedEnd={false}
            color="#2546ff"
          />
          <S.CalendarBar
            row={4}
            column={0}
            length={3}
            level={0}
            roundedStart={false}
            roundedEnd={true}
            color="#2546ff"
          />
          <S.CalendarBar
            row={3}
            column={1}
            length={5}
            level={1}
            roundedStart={true}
            roundedEnd={true}
            color="#2596ff"
          />
          <S.CalendarBar
            row={5}
            column={4}
            length={3}
            level={0}
            roundedStart={true}
            roundedEnd={false}
            color="#2cbeeb"
          />
        </S.CalendarBarContainer>
      </S.CalendarContainer>
      <S.MousePointer src={mousePointer} animation={animation} />
    </S.Container>
  );
};

export default TeamCalendarDecoration;
