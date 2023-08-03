import type { TeamPlace } from '~/types/team';

export const getInfoByTeamPlaceId = (
  teamPlaces: TeamPlace[],
  teamPlaceId: number,
) => {
  const teamPlace = teamPlaces.find(
    (teamPlace) => teamPlace.id === teamPlaceId,
  );

  if (teamPlace === undefined) return;

  return {
    teamPlaceColor: teamPlace.teamPlaceColor,
    displayName: teamPlace.displayName,
  };
};
