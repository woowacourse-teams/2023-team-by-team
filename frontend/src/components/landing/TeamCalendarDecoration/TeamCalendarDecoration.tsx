import * as S from './TeamCalendarDecoration.styled';
import Text from '~/components/common/Text/Text';
import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/svg';
import { mousePointer } from '~/assets/png';

const CELL_COUNT = 42;

const TeamCalendarDecoration = () => {
  return (
    <S.Container>
      <S.TeamBadge />
      <S.CalendarHeaderContainer>
        <ArrowLeftIcon />
        <Text css={S.calendarHeaderText}>2023-09</Text>
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
      <S.MousePointer src={mousePointer} />
    </S.Container>
  );
};

export default TeamCalendarDecoration;
