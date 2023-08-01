import type { ComponentPropsWithoutRef, MouseEventHandler } from 'react';
import { useRef, type PropsWithChildren, useEffect } from 'react';
import { useMenu } from '~/hooks/useMenu';
import useClickOutside from '~/hooks/useClickOutside';
import * as S from './MenuList.styled';

export interface MenuListProps extends ComponentPropsWithoutRef<'ul'> {
  width?: string;
}

const MenuList = (props: PropsWithChildren<MenuListProps>) => {
  const { children, onClick, width = '100%' } = props;
  const { isMenuOpen, handleMenuOpen, handleSelectedValueChange } = useMenu();
  const offsetRef = useRef(0);
  const ref = useRef<HTMLUListElement>(null);

  useClickOutside(ref, (e: Event) => {
    const { target } = e;

    if (target instanceof HTMLButtonElement) {
      return;
    }

    handleMenuOpen();
  });

  const handleMenuClick: MouseEventHandler<HTMLUListElement> = (e) => {
    const { target } = e;

    if (!(target instanceof HTMLLIElement)) {
      return;
    }

    const { textContent } = target;

    if (!textContent) {
      return;
    }

    onClick?.(e);
    offsetRef.current = target.offsetTop;
    handleSelectedValueChange(textContent);
    handleMenuOpen();
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.scrollTo(0, offsetRef.current);
  });

  return (
    <>
      {isMenuOpen && (
        <S.Wrapper
          role="menu"
          ref={ref}
          width={width}
          onClick={handleMenuClick}
        >
          {children}
        </S.Wrapper>
      )}
    </>
  );
};

export default MenuList;
