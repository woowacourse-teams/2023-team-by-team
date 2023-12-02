import { Outlet } from 'react-router-dom';
import NavigationBar from '~/components/common/NavigationBar/NavigationBar';
import SideBar from '~/components/common/SideBar/SideBar';
import Header from '~/components/common/Header/Header';
import { ModalProvider } from '~/components/common/Modal/ModalContext';
import { useSSE } from '~/hooks/queries/useSSE';
import * as S from './PageTemplate.styled';

const PageTemplate = () => {
  useSSE();

  return (
    <S.PageContainer>
      <ModalProvider>
        <Header />
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
