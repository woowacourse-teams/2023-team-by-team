import { Route, Routes } from 'react-router-dom';
import TeamFeedPage from '~/components/pages/TeamFeedPage/TeamFeedPage';
import LandingPage from '~/components/pages/LandingPage/LandingPage';
import PageTemplate from '~/components/pages/PageTemplate/PageTemplate';
import TeamCalendarPage from '~/components/pages/TeamCalendarPage/TeamCalendarPage';
import TeamSelectPage from '~/components/pages/TeamSelectPage/TeamSelectPage';
import { PATH_NAME } from '~/constants/routes';

const App = () => {
  return (
    <Routes>
      <Route path={PATH_NAME.LANDING} element={<LandingPage />} />
      <Route element={<PageTemplate />}>
        <Route path={PATH_NAME.TEAM_SELECT} element={<TeamSelectPage />} />
        <Route path={PATH_NAME.TEAM_CALENDAR} element={<TeamCalendarPage />} />
        <Route path={PATH_NAME.TEAM_SELECT} element={<TeamCalendarPage />} />
        <Route path={PATH_NAME.TEAM_FEED} element={<TeamFeedPage />} />
      </Route>
    </Routes>
  );
};

export default App;
