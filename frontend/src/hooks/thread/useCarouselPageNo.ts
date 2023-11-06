import { useState, useEffect } from 'react';

interface UseCarouselPageNoProps {
  initialPage: number;
  pageCount: number;
}

const useCarouselPageNo = (props: UseCarouselPageNoProps) => {
  const { initialPage, pageCount } = props;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      const { key } = e;

      if (key >= '1' && key <= '9' && Number(key) <= pageCount) {
        setCurrentPage(() => Number(key));
        return;
      }

      if (key === 'ArrowLeft') {
        setCurrentPage((prev) => ((prev + pageCount - 2) % pageCount) + 1);
      }

      if (key === 'ArrowRight') {
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
