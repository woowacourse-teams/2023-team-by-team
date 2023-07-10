import { useEffect } from 'react';

export const useKeydownEffect = (triggerKey: string, callback: () => void) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key !== triggerKey) {
        return;
      }

      callback();
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);
};
