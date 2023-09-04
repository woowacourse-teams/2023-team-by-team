import { useRef, useEffect } from 'react';
import type {
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';
import { useMenu } from '~/hooks/useMenu';
import useClickOutside from '~/hooks/useClickOutside';
import * as S from './MenuList.styled';

export interface MenuListProps {
  width?: string;
  onSelect?: (value: string) => void;
}

const MENU_TRIGGER_KEYS = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape'];

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

    onSelect?.(textContent);
    handleSelectedValueChange(textContent);
    handleMenuOpen();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLUListElement> = (e) => {
    if (!MENU_TRIGGER_KEYS.includes(e.key)) {
      return;
    }

    e.preventDefault();

    if (e.key === 'Escape') {
      handleMenuOpen();
      return;
    }

    const children = Array.from(ref.current?.children ?? []);
    const selectedChildIndex = children.findIndex((child) =>
      child.classList.contains('selected'),
    );

    if (selectedChildIndex === -1) {
      return;
    }

    if (e.key === 'ArrowDown') {
      focusNextChild(children, selectedChildIndex);
      return;
    }

    if (e.key === 'ArrowUp') {
      focusPrevChild(children, selectedChildIndex);
      return;
    }

    if (e.key === 'Enter') {
      const selectedChild = children[selectedChildIndex];
      const { textContent } = selectedChild;

      if (!textContent) {
        return;
      }

      onSelect?.(textContent);
      handleSelectedValueChange(textContent);
      handleMenuOpen();
    }
  };

  const focusPrevChild = (children: Element[], selectedChildIndex: number) => {
    if (selectedChildIndex === 0) {
      return;
    }

    const currentChild = children[selectedChildIndex];
    const prevChild = children[selectedChildIndex - 1];

    currentChild.classList.remove('selected');
    prevChild.classList.add('selected');

    scrollToChild(prevChild);
  };

  const focusNextChild = (children: Element[], selectedChildIndex: number) => {
    if (selectedChildIndex === children.length - 1) {
      return;
    }

    const currentChild = children[selectedChildIndex];
    const nextChild = children[selectedChildIndex + 1];

    currentChild.classList.remove('selected');
    nextChild.classList.add('selected');

    scrollToChild(nextChild);
  };

  const scrollToChild = (child: Element) => {
    if (!(child instanceof HTMLLIElement)) {
      return;
    }

    const { offsetTop } = child;

    ref.current?.scrollTo(0, offsetTop);
  };

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
