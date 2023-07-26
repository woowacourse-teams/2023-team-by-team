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
      <Button
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={handleMenuOpen}
      >
        메뉴 열기
      </Button>
      {isOpen && (
        <S.MenuWrapper role="menu">
          {menuItems.map((menuItem) => (
            <S.MenuItem role="menuitem" key={menuItem}>
              {menuItem}
            </S.MenuItem>
          ))}
        </S.MenuWrapper>
      )}
    </>
  );
};

export default Menu;
