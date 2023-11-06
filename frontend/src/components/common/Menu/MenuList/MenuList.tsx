import { useRef, useEffect } from 'react';
import type { MouseEventHandler, PropsWithChildren } from 'react';
import { useMenu } from '~/hooks/useMenu';
import { useClickOutside } from '~/hooks/useClickOutside';
import { useListKeyboardNavigation } from '~/hooks/useListKeyboardNavigation';
import * as S from './MenuList.styled';

export interface MenuListProps {
  width?: string;
  onSelect?: (value: string) => void;
}

const MenuList = (props: PropsWithChildren<MenuListProps>) => {
  const { children, onSelect, width = '100%' } = props;

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

    selectItem(textContent);
  };

  const selectItem = (value: string) => {
    onSelect?.(value);
    handleSelectedValueChange(value);
    handleMenuOpen();
  };

  const {
    handlers: { handleMouseEnter, handleMouseLeave, handleKeyDown },
  } = useListKeyboardNavigation(ref, handleMenuOpen, selectItem);

  useEffect(() => {
    if (isMenuOpen && ref.current) {
      ref.current.focus();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (selectedValue === '' || !isMenuOpen) {
      return;
    }

    if (!ref.current) {
      return;
    }

    const target = Array.from(ref.current.children).find(
      (child) => child.textContent?.replace('✓', '') === selectedValue,
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {children}
        </S.Wrapper>
      )}
    </>
  );
};

export default MenuList;
