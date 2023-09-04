import { useRef, useEffect } from 'react';
import type {
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';
import { useMenu } from '~/hooks/useMenu';
import useClickOutside from '~/hooks/useClickOutside';
import { MENU_TRIGGER_KEYS } from '~/constants/menu';
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
  const isMouseOver = useRef(false);

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

  const handleMouseEnter: MouseEventHandler<HTMLUListElement> = () => {
    isMouseOver.current = true;

    const children = Array.from(ref.current?.children ?? []);
    const selectedChildIndex = children.findIndex((child) =>
      child.classList.contains('selected'),
    );

    if (selectedChildIndex === -1) {
      return;
    }

    children[selectedChildIndex].classList.remove('selected');
  };

  const handleMouseLeave: MouseEventHandler<HTMLUListElement> = () => {
    isMouseOver.current = false;
  };

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

    if (e.key === 'ArrowUp') {
      if (selectedChildIndex === -1) {
        isMouseOver.current
          ? focusPrevChild(children, getHoveredChildIndex(children))
          : focusChild(children[children.length - 1]);

        return;
      }

      focusPrevChild(children, selectedChildIndex);
      return;
    }

    if (e.key === 'ArrowDown') {
      if (selectedChildIndex === -1) {
        isMouseOver.current
          ? focusNextChild(children, getHoveredChildIndex(children))
          : focusChild(children[0]);

        return;
      }

      focusNextChild(children, selectedChildIndex);
      return;
    }

    if (e.key === 'Enter') {
      if (selectedChildIndex === -1) {
        return;
      }

      const selectedChild = children[selectedChildIndex];
      const { textContent } = selectedChild;

      if (!textContent) {
        return;
      }

      selectItem(textContent);
    }
  };

  const getHoveredChildIndex = (children: Element[]) => {
    const hoveredChild = ref.current?.querySelector(':hover');
    const hoveredChildIndex = children.findIndex(
      (child) => child === hoveredChild,
    );

    return hoveredChildIndex;
  };

  const focusPrevChild = (children: Element[], selectedChildIndex: number) => {
    if (selectedChildIndex === 0) {
      return;
    }

    const currentChild = children[selectedChildIndex];
    const prevChild = children[selectedChildIndex - 1];

    currentChild.classList.remove('selected');

    focusChild(prevChild);
  };

  const focusNextChild = (children: Element[], selectedChildIndex: number) => {
    if (selectedChildIndex === children.length - 1) {
      return;
    }

    const currentChild = children[selectedChildIndex];
    const nextChild = children[selectedChildIndex + 1];

    currentChild.classList.remove('selected');

    focusChild(nextChild);
  };

  const focusChild = (child: Element) => {
    child.classList.add('selected');

    scrollToChild(child);
  };

  const scrollToChild = (child: Element) => {
    if (!(child instanceof HTMLLIElement)) {
      return;
    }

    const { offsetTop } = child;

    ref.current?.scrollTo(0, offsetTop);
  };

  const selectItem = (value: string) => {
    onSelect?.(value);
    handleSelectedValueChange(value);
    handleMenuOpen();
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
