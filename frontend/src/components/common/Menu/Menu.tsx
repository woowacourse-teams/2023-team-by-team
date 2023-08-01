import { MenuProvider } from '~/components/common/Menu/MenuContext';
import * as S from './Menu.styled';
import type { PropsWithChildren } from 'react';

const Menu = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <MenuProvider>
      <S.Wrapper>{children}</S.Wrapper>
    </MenuProvider>
  );
};

export default Menu;
