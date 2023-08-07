import type { TeamPlace, TeamPlaceColor } from '~/types/team';

export const getInfoByTeamPlaceId = (
  teamPlaces: TeamPlace[],
  teamPlaceId: number,
) => {
  const teamPlace = teamPlaces.find(
    (teamPlace) => teamPlace.id === teamPlaceId,
  );

  if (teamPlace === undefined)
    return {
      teamPlaceColor: 100 as TeamPlaceColor,
      displayName: '',
    };

  return {
    teamPlaceColor: teamPlace.teamPlaceColor,
    displayName: teamPlace.displayName,
  };
};
