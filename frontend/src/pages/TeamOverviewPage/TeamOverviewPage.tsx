import * as S from './TeamOverviewPage.styled';
import TeamCalendarPage from '../TeamCalendarPage/TeamCalendarPage';
import TeamLinkPage from '../TeamLinkPage/TeamLinkPage';
import TeamFeedPage from '../TeamFeedPage/TeamFeedPage';
import { ModalProvider } from '~/components/common/Modal/ModalContext';

const TeamOverviewPage = () => {
  return (
    <S.Container>
      <S.TeamCalendarSection>
        <ModalProvider>
          <TeamCalendarPage />
        </ModalProvider>
      </S.TeamCalendarSection>
      <S.TeamLinkSection>
        <ModalProvider>
          <TeamLinkPage />
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
