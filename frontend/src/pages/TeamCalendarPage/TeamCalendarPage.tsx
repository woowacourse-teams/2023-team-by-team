import TeamCalendar from '~/components/team_calendar/TeamCalendar/TeamCalendar';
import * as S from './TeamCalendarPage.styled';
import { getIsMobile } from '~/utils/getIsMobile';

const TeamCalendarPage = () => {
  const isMobile = getIsMobile();

  return (
    <S.Container>
      <TeamCalendar calendarSize={isMobile ? 'sm' : 'md'} />
    </S.Container>
  );
};

export default TeamCalendarPage;
