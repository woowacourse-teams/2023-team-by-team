import { useState, useEffect } from 'react';
import { KEY_CODE } from '~/constants/feed';

interface UseCarouselPageNoProps {
  initialPage: number;
  pageCount: number;
}

const useCarouselPageNo = (props: UseCarouselPageNoProps) => {
  const { initialPage, pageCount } = props;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      const { key, keyCode } = e;

      console.log('key press', key);

      if (key >= '1' && key <= '9' && Number(key) <= pageCount) {
        setCurrentPage(() => Number(key));
        return;
      }

      if (
        keyCode >= KEY_CODE.DIGIT1 &&
        keyCode <= KEY_CODE.DIGIT9 &&
        keyCode - 48 <= pageCount
      ) {
        setCurrentPage(() => KEY_CODE.DIGIT1 - 48);
        return;
      }

      if (key === 'ArrowLeft' || keyCode === KEY_CODE.ARROW_LEFT) {
        setCurrentPage((prev) => ((prev + pageCount - 2) % pageCount) + 1);
      }

      if (key === 'ArrowRight' || keyCode === KEY_CODE.ARROW_RIGHT) {
        setCurrentPage((prev) => (prev % pageCount) + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pageCount]);

  return { currentPage, setCurrentPage };
};

export { useCarouselPageNo };
