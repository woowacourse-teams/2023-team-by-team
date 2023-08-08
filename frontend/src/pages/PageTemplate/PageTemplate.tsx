import * as S from './PageTemplate.styled';
import NavigationBar from '~/components/common/NavigationBar/NavigationBar';
import SideBar from '~/components/common/SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import Header from '~/components/common/Header/Header';

const PageTemplate = () => {
  return (
    <>
      <Header />
      <S.Container>
        <NavigationBar />
        <Outlet />
        <SideBar />
      </S.Container>
    </>
  );
};

export default PageTemplate;
