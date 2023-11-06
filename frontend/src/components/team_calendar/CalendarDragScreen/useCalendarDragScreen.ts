import { useEffect } from 'react';

interface UseCalendarDragScreenProps {
  onMouseUp: () => void;
}

export const useCalendarDragScreen = (props: UseCalendarDragScreenProps) => {
  const { onMouseUp } = props;

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseUp]);
};
