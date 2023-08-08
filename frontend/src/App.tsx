import { Route, Routes } from 'react-router-dom';
import ProtectRoute from '~/components/common/ProtectRoute/ProtectRoute';
import { PATH_NAME } from '~/constants/routes';
import LandingPage from '~/pages/LandingPage/LandingPage';
import LoginPage from '~/pages/LoginPage/LoginPage';
import PageTemplate from '~/pages/PageTemplate/PageTemplate';
import TeamCalendarPage from '~/pages/TeamCalendarPage/TeamCalendarPage';
import TeamFeedPage from '~/pages/TeamFeedPage/TeamFeedPage';
import TeamSelectPage from '~/pages/TeamSelectPage/TeamSelectPage';

const App = () => {
  return (
    <Routes>
      <Route path={PATH_NAME.LANDING} element={<LandingPage />} />
      <Route path={PATH_NAME.LOGIN} element={<LoginPage />} />
      <Route element={<ProtectRoute />}>
        <Route element={<PageTemplate />}>
          <Route path={PATH_NAME.TEAM_SELECT} element={<TeamSelectPage />} />
          <Route
            path={PATH_NAME.TEAM_CALENDAR}
            element={<TeamCalendarPage />}
          />
          <Route path={PATH_NAME.TEAM_FEED} element={<TeamFeedPage />} />
        </Route>
        <Route>팀 참가</Route>
        <Route>팀 생성</Route>
      </Route>
    </Routes>
  );
};

export default App;
