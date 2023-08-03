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
  const {
    isMenuOpen,
    selectedValue,
    handleMenuOpen,
    handleSelectedValueChange,
  } = useMenu();
  const ref = useRef<HTMLUListElement>(null);

  useClickOutside(ref, (e: Event) => {
    const { target } = e;

    if (target instanceof HTMLButtonElement) {
      return;
    }

    if ((target as HTMLElement).closest('button')) {
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
    handleSelectedValueChange(textContent);
    handleMenuOpen();
  };

  useEffect(() => {
    if (selectedValue === '' || !isMenuOpen) {
      return;
    }

    if (!ref.current) {
      return;
    }

    const target = Array.from(ref.current.children).find(
      (child) => child.textContent === selectedValue,
    );

    if (!(target instanceof HTMLLIElement)) {
      return;
    }

    const { offsetTop } = target;

    ref.current.scrollTo(0, offsetTop);
  }, [isMenuOpen, selectedValue]);

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
