import FeedPage from '~/components/pages/FeedPage/FeedPage';
import LandingPage from '~/components/pages/LandingPage/LandingPage';
import TeamCalendarPage from '~/components/pages/TeamCalendarPage/TeamCalendarPage';
import TeamSelectPage from '~/components/pages/TeamSelectPage/TeamSelectPage';

export const PATH_NAME = {
  LANDING: '/',
  TEAM_SELECT: '/team-select',
  TEAM_CALENDAR: '/team-calendar',
  TEAM_THREAD: '/team-threads',
};

const SPECIAL_ROUTES = {
  LANDING: {
    path: PATH_NAME.LANDING,
    element: <LandingPage />,
  },
  LOGIN: {},
};

const MAIN_ROUTES = {
  TEAM_SELECT: {
    path: PATH_NAME.TEAM_SELECT,
    element: <TeamSelectPage />,
  },
  TEAM_CALENDAR: {
    path: PATH_NAME.TEAM_CALENDAR,
    element: <TeamCalendarPage />,
  },
  TEAM_THREAD: {
    path: PATH_NAME.TEAM_THREAD,
    element: <FeedPage />,
  },
};

export const ROUTES = { MAIN_ROUTES, SPECIAL_ROUTES } as const;
