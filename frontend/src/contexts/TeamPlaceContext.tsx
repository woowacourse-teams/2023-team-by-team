import { createContext, useCallback, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { useFetchTeamPlaces } from '~/hooks/queries/useFetchTeamPlaces';
import type { TeamPlace, TeamPlaceColor } from '~/types/team';
import { getInfoByTeamPlaceId } from '~/utils/getInfoByTeamPlaceId';

interface TeamPlaceContextProps {
  teamPlaces: TeamPlace[];
  teamPlaceId: number;
  teamPlaceColor: TeamPlaceColor;
  displayName: string;
  changeTeamPlace: (id: number) => void;
}

export const TeamPlaceContext = createContext<TeamPlaceContextProps>(
  {} as TeamPlaceContextProps,
);

export const TeamPlaceProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const teamPlaces = useFetchTeamPlaces();
  const [teamPlaceId, setTeamPlaceId] = useState(0);
  const [teamPlaceColor, setTeamPlaceColor] = useState<TeamPlaceColor>(100);
  const [displayName, setDisplayName] = useState('');

  const changeTeamPlace = useCallback(
    (id: number) => {
      const { teamPlaceColor: color, displayName: name } = getInfoByTeamPlaceId(
        teamPlaces,
        id,
      );
      setDisplayName(() => name);
      setTeamPlaceColor(() => color);
      setTeamPlaceId(() => id);
      localStorage.setItem('teamPlaceId', String(id));
    },
    [teamPlaces],
  );

  useEffect(() => {
    const id = localStorage.getItem('teamPlaceId');

    if (id) {
      changeTeamPlace(Number(id));
    }
  }, [changeTeamPlace]);

  useEffect(() => {
    const initTeamPlaceId =
      Number(localStorage.getItem('teamPlaceId')) ?? teamPlaces[0].id;
    setTeamPlaceId(initTeamPlaceId);
  }, []);

  const value = {
    teamPlaces,
    teamPlaceId,
    teamPlaceColor,
    displayName,
    changeTeamPlace,
  } as const;

  return (
    <TeamPlaceContext.Provider value={value}>
      {children}
    </TeamPlaceContext.Provider>
  );
};
