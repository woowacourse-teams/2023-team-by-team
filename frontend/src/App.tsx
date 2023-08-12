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
import TeamLinkPage from './pages/TeamLinkPage/TeamLinkPage';

const App = () => {
  return (
    <Routes>
      <Route path={PATH_NAME.LANDING} element={<LandingPage />} />
      <Route path={PATH_NAME.LOGIN} element={<LoginPage />} />
      <Route element={<ProtectRoute />}>
        <Route path={PATH_NAME.START} element={<StartPage />} />
        <Route path={PATH_NAME.CREATE} element={<CreatePage />} />
        <Route path={PATH_NAME.JOIN} element={<JoinPage />} />
        <Route element={<PageTemplate />}>
          <Route path={PATH_NAME.TEAM_SELECT} element={<TeamSelectPage />} />
          <Route
            path={PATH_NAME.TEAM_CALENDAR}
            element={<TeamCalendarPage />}
          />
          <Route path={PATH_NAME.TEAM_FEED} element={<TeamFeedPage />} />
          <Route path={PATH_NAME.TEAM_LINK} element={<TeamLinkPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
