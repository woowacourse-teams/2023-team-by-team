import { useState } from 'react';
import Button from '~/components/common/Button/Button';
import * as S from './Menu.styled';

interface MenuProps {
  menuItems: string[];
}

const Menu = (props: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { menuItems } = props;

  const handleMenuOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Button onClick={handleMenuOpen}>메뉴 열기</Button>
      {isOpen && (
        <S.MenuWrapper>
          {menuItems.map((menuItem) => (
            <S.MenuItem key={menuItem}>{menuItem}</S.MenuItem>
          ))}
        </S.MenuWrapper>
      )}
    </>
  );
};

export default Menu;
