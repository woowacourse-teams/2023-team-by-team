import * as S from './PageTemplate.styled';
import NavigationBar from '~/components/common/NavigationBar/NavigationBar';
import SideBar from '~/components/common/SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import Header from '~/components/common/Header/Header';
import { ModalProvider } from '~/components/common/Modal/ModalContext';
import { Suspense } from 'react';
import HeaderFallback from '~/components/common/Header/HeaderFallback/HeaderFallback';

const PageTemplate = () => {
  return (
    <S.PageContainer>
      <ModalProvider>
        <Suspense fallback={<HeaderFallback />}>
          <Header />
        </Suspense>
      </ModalProvider>
      <S.Container>
        <NavigationBar />
        <ModalProvider>
          <S.PageWrapper>
            <Outlet />
          </S.PageWrapper>
        </ModalProvider>
        <SideBar />
      </S.Container>
    </S.PageContainer>
  );
};

export default PageTemplate;
