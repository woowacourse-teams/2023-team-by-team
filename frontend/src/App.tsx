import { Route, Routes } from 'react-router-dom';
import LandingPage from '~/components/pages/LandingPage/LandingPage';
import PageTemplate from '~/components/pages/PageTemplate/PageTemplate';
import { PATH_NAME, ROUTES } from '~/constants/routes';

const App = () => {
  return (
    <Routes>
      <Route path={PATH_NAME.LANDING} element={<LandingPage />} />
      <Route path={PATH_NAME.TEAM_SELECT} element={<PageTemplate />}>
        {Object.values(ROUTES.MAIN_ROUTES).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
