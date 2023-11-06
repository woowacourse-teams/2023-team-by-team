import { useRef, useState } from 'react';
import { useModal } from '~/hooks/useModal';
import theme from '~/styles/theme';

export const useBottomSheet = () => {
  const [isClosing, setIsClosing] = useState(false);
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const { closeModal } = useModal();

  const handleClose = () => {
    setIsClosing(() => true);

    timerId.current = setTimeout(() => {
      setIsClosing(() => false);
      closeModal();

      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    }, theme.animation.duration);
  };

  return {
    handleClose,
    isClosing,
  };
};
