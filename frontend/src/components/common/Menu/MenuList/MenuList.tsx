import { useRef, type PropsWithChildren } from 'react';
import { useMenu } from '~/hooks/useMenu';
import useClickOutside from '~/hooks/useClickOutside';
import * as S from './MenuList.styled';

export interface MenuListProps {
  width?: string;
}

const MenuList = (props: PropsWithChildren<MenuListProps>) => {
  const { children, width = '100%' } = props;
  const { isMenuOpen, handleMenuOpen } = useMenu();
  const ref = useRef<HTMLUListElement>(null);

  useClickOutside(ref, (e: Event) => {
    const { target } = e;

    if (target instanceof HTMLButtonElement) {
      return;
    }

    handleMenuOpen();
  });

  return (
    <>
      {isMenuOpen && (
        <S.Wrapper role="menu" ref={ref} width={width}>
          {children}
        </S.Wrapper>
      )}
    </>
  );
};

export default MenuList;
