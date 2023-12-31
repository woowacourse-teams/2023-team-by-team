import * as S from './M_PageTemplate.styled';
import NavigationBar from '~/components/common/NavigationBar/NavigationBar';
import { Outlet } from 'react-router-dom';
import Header from '~/components/common/Header/Header';
import { ModalProvider } from '~/components/common/Modal/ModalContext';
import { useSSE } from '~/hooks/queries/useSSE';

const M_PageTemplate = () => {
  useSSE();

  return (
    <S.PageContainer>
      <ModalProvider>
        <Header />
      </ModalProvider>
      <ModalProvider>
        <S.PageWrapper>
          <Outlet />
        </S.PageWrapper>
      </ModalProvider>

      <NavigationBar />
    </S.PageContainer>
  );
};

export default M_PageTemplate;
