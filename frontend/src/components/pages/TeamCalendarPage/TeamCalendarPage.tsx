import Calendar from '~/components/Calendar/Calendar';
import * as S from './TeamCalendarPage.styled';
import Text from '~/components/common/Text/Text';

const TeamCalendarPage = () => {
  return (
    <S.Container>
      <div>
        <Text as="h2" css={S.highLight}>
          팀 캘린더
        </Text>
      </div>
      <Calendar />
    </S.Container>
  );
};

export default TeamCalendarPage;
