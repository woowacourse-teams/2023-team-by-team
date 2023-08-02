import type { PropsWithChildren } from 'react';
import { MenuProvider } from '~/components/common/Menu/MenuContext';
import * as S from './Menu.styled';
import MenuButton from '~/components/common/Menu/MenuButton/MenuButton';
import MenuList from '~/components/common/Menu/MenuList/MenuList';
import MenuItem from '~/components/common/Menu/MenuItem/MenuItem';

const Menu = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <MenuProvider>
      <S.Wrapper>{children}</S.Wrapper>
    </MenuProvider>
  );
};

Menu.Button = MenuButton;
Menu.List = MenuList;
Menu.Item = MenuItem;

export default Menu;
