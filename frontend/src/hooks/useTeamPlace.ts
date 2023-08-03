import { useContext } from 'react';
import { TeamPlaceContext } from '~/contexts/TeamPlaceContext';

export const useTeamPlace = () => {
  const context = useContext(TeamPlaceContext);

  if (context === undefined) {
    throw new Error('useTeamPlace must be used within a TeamPlaceContext');
  }

  return context;
};
