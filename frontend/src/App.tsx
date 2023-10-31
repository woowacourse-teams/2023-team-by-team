import { Route, Routes } from 'react-router-dom';
import ProtectRoute from '~/components/common/ProtectRoute/ProtectRoute';
import { PATH_NAME } from '~/constants/routes';
import LandingPage from '~/pages/LandingPage/LandingPage';
import LoginPage from '~/pages/LoginPage/LoginPage';
import PageTemplate from '~/pages/PageTemplate/PageTemplate';
import TeamCalendarPage from '~/pages/TeamCalendarPage/TeamCalendarPage';
import TeamFeedPage from '~/pages/TeamFeedPage/TeamFeedPage';
import StartPage from '~/pages/StartPage/StartPage';
import TeamSelectPage from '~/pages/TeamSelectPage/TeamSelectPage';
import CreatePage from '~/pages/CreatePage/CreatePage';
import JoinPage from '~/pages/JoinPage/JoinPage';
import TeamLinkPage from '~/pages/TeamLinkPage/TeamLinkPage';
import TeamOverviewPage from '~/pages/TeamOverviewPage/TeamOverviewPage';
import PolicyPage from '~/pages/PolicyPage/PolicyPage';
import Error404Page from '~/pages/Error404Page/Error404Page';
import './App.css';
import { useCheckMobileWeb } from '~/hooks/useCheckMobileWeb';
import M_LandingPage from '~/mobilePages/M_LandingPage/M_LandingPage';

const App = () => {
  const isMobile = useCheckMobileWeb();

  console.log(isMobile);

  if (isMobile) {
    return (
      <Routes>
        <Route path={PATH_NAME.LANDING} element={<M_LandingPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={PATH_NAME.LANDING} element={<LandingPage />} />
      <Route path={PATH_NAME.LOGIN} element={<LoginPage />} />
      <Route path={PATH_NAME.POLICY} element={<PolicyPage />} />
      <Route element={<ProtectRoute />}>
        <Route path={PATH_NAME.START} element={<StartPage />} />
        <Route path={PATH_NAME.CREATE} element={<CreatePage />} />
        <Route path={PATH_NAME.JOIN} element={<JoinPage />} />
        <Route element={<PageTemplate />}>
          <Route path={PATH_NAME.TEAM_SELECT} element={<TeamSelectPage />} />
          <Route
            path={PATH_NAME.TEAM_OVERVIEW}
            element={<TeamOverviewPage />}
          />
          <Route
            path={PATH_NAME.TEAM_CALENDAR}
            element={<TeamCalendarPage />}
          />
          <Route path={PATH_NAME.TEAM_FEED} element={<TeamFeedPage />} />
          <Route path={PATH_NAME.TEAM_LINK} element={<TeamLinkPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};

export default App;
