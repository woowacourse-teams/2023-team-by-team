import { useContext } from 'react';
import { TokenContext } from '~/contexts/TokenContext';

export const useToken = () => {
  const context = useContext(TokenContext);

  if (context === undefined) {
    throw new Error('useToken must be used within a TokenContext');
  }

  return context;
};
