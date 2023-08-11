import { createContext, useCallback, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
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
  const { teamPlaces, isFetched } = useFetchTeamPlaces();
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
      localStorage.setItem(LOCAL_STORAGE_KEY.TEAM_PLACE_ID, String(id));
    },
    [teamPlaces],
  );

  useEffect(() => {
    if (!isFetched) return;

    if (teamPlaces.length === 0) return;
    const id = localStorage.getItem(LOCAL_STORAGE_KEY.TEAM_PLACE_ID);
    const initTeamPlaceId = id === null ? teamPlaces[0].id : Number(id);

    changeTeamPlace(initTeamPlaceId);
  }, [isFetched, changeTeamPlace, teamPlaces]);

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
