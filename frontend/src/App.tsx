import { Outlet } from 'react-router-dom';
import Header from '~/components/common/Header/Header';
import PageTemplate from '~/pages/PageTemplate/PageTemplate';

const App = () => {
  return (
    <>
      <Header />
      <PageTemplate>
        <Outlet />
      </PageTemplate>
    </>
  );
};

export default App;
