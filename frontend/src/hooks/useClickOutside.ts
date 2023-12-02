import { useEffect } from 'react';
import type { RefObject, MutableRefObject } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T> | MutableRefObject<T>,
  callback: EventListener,
) => {
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback(e);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback, ref]);
};
