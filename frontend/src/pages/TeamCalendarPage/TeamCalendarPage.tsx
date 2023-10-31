import TeamCalendar from '~/components/team_calendar/TeamCalendar/TeamCalendar';
import * as S from './TeamCalendarPage.styled';
import { useCheckMobileWeb } from '~/hooks/useCheckMobileWeb';

const TeamCalendarPage = () => {
  const isMobile = useCheckMobileWeb();

  return (
    <S.Container>
      <TeamCalendar calendarSize={isMobile ? 'sm' : 'md'} />
    </S.Container>
  );
};

export default TeamCalendarPage;
