import type { PropsWithChildren } from 'react';
import * as S from './PageTemplate.styled';
import NavigationBar from '~/components/common/NavigationBar/NavigationBar';
import SideBar from '~/components/common/SideBar/SideBar';

const PageTemplate = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <S.Container>
      <NavigationBar />
      {children}
      <SideBar />
    </S.Container>
  );
};

export default PageTemplate;
