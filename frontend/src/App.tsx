import { Outlet } from 'react-router-dom';
import Header from '~/components/common/Header/Header';

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
