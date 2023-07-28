import { useRef, useState } from 'react';
import { useModal } from '~/hooks/useModal';

const useBottomSheet = () => {
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
    }, 300);
  };

  return {
    handleClose,
    isClosing,
  };
};

export default useBottomSheet;
