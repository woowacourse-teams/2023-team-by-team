import * as S from './TeamOverviewPage.styled';
import TeamFeedPage from '../TeamFeedPage/TeamFeedPage';
import { ModalProvider } from '~/components/common/Modal/ModalContext';
import TeamCalendar from '~/components/team_calendar/TeamCalendar/TeamCalendar';
import LinkTable from '~/components/link/LinkTable/LinkTable';

const TeamOverviewPage = () => {
  return (
    <S.Container>
      <S.TeamCalendarSection>
        <ModalProvider>
          <TeamCalendar calendarSize="sm" />
        </ModalProvider>
      </S.TeamCalendarSection>
      <S.TeamLinkSection>
        <ModalProvider>
          <LinkTable linkSize="sm" />
        </ModalProvider>
      </S.TeamLinkSection>
      <S.TeamFeedSection>
        <ModalProvider>
          <TeamFeedPage threadSize="sm" />
        </ModalProvider>
      </S.TeamFeedSection>
    </S.Container>
  );
};

export default TeamOverviewPage;
