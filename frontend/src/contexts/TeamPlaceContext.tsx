import { createContext } from 'react';
import type { PropsWithChildren } from 'react';
import { useFetchTeamPlaces } from '~/hooks/queries/useFetchTeamPlaces';
import type { TeamPlace } from '~/types/team';

interface TeamPlaceContextProps {
  teamPlaces: TeamPlace[];
}

export const TeamPlaceContext = createContext<TeamPlaceContextProps>(
  {} as TeamPlaceContextProps,
);

export const TeamPlaceProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const teamPlaces = useFetchTeamPlaces();

  const value = { teamPlaces } as const;

  return (
    <TeamPlaceContext.Provider value={value}>
      {children}
    </TeamPlaceContext.Provider>
  );
};
