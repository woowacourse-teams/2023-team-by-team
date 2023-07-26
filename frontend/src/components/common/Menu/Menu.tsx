import { useRef, useState } from 'react';
import Button from '~/components/common/Button/Button';
import * as S from './Menu.styled';
import useClickOutside from '~/hooks/useClickOutside';

interface MenuProps {
  menuItems: string[];
}

const Menu = (props: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { menuItems } = props;
  const menuRef = useRef<HTMLUListElement>(null);

  const handleMenuOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useClickOutside(menuRef, handleMenuOpen);

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
        <S.MenuWrapper role="menu" ref={menuRef}>
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
