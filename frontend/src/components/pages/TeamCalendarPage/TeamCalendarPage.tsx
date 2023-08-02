import Calendar from '~/components/Calendar/Calendar';
import * as S from './TeamCalendarPage.styled';
import Text from '~/components/common/Text/Text';

const TeamCalendarPage = () => {
  return (
    <S.Container>
      <Calendar />
    </S.Container>
  );
};

export default TeamCalendarPage;
