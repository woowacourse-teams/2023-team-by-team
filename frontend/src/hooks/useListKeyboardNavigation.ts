import { useRef } from 'react';
import type { MouseEventHandler, KeyboardEventHandler, RefObject } from 'react';

const TRIGGER_KEYS = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape'];

export const useListKeyboardNavigation = (
  ref: RefObject<HTMLElement>,
  onClose: () => void,
  onSelect: (value: string) => void,
) => {
  const isMouseOver = useRef(false);

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

  const handleKeyDown: KeyboardEventHandler<HTMLUListElement> = (e) => {
    if (!TRIGGER_KEYS.includes(e.key)) {
      return;
    }

    e.preventDefault();

    if (e.key === 'Escape') {
      onClose();
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

      onSelect(textContent);
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

  return {
    handlers: {
      handleMouseEnter,
      handleMouseLeave,
      handleKeyDown,
    },
  };
};
