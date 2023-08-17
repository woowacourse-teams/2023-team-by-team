import { useState, useEffect, useCallback } from 'react';
import type { RefObject } from 'react';

export const useCalendarWidthLeft = (targetRef: RefObject<HTMLElement>) => {
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);

  const updateWidthLeft = useCallback(() => {
    const targetElement = targetRef.current;

    if (targetElement) {
      const { width, left } = targetElement.getBoundingClientRect();

      setWidth(() => width);
      setLeft(() => left);
    }
  }, [targetRef]);

  useEffect(() => {
    window.addEventListener('resize', updateWidthLeft);
    updateWidthLeft();

    return () => {
      window.removeEventListener('resize', updateWidthLeft);
    };
  }, [targetRef, updateWidthLeft]);

  return { width, left };
};
