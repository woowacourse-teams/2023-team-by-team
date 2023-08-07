import type { PropsWithChildren } from 'react';
import * as S from './PageTemplate.styled';
import NavigationBar from '~/components/common/NavigationBar/NavigationBar';
import SideBar from '~/components/common/SideBar/SideBar';
import Header from '~/components/common/Header/Header';
import { Outlet } from 'react-router-dom';

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
