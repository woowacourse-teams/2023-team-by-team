import { useEffect, type RefObject } from 'react';

export const useIntersectionObserver = <T extends HTMLElement>(
  targetRef: RefObject<T>,
  onIntersect: IntersectionObserverCallback,
) => {
  useEffect(() => {
    let observer: IntersectionObserver;

    if (targetRef && targetRef.current) {
      observer = new IntersectionObserver(onIntersect, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      });

      observer.observe(targetRef.current);
    }

    return () => observer && observer.disconnect();
  }, [targetRef]);
};
