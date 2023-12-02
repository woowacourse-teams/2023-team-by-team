import { useQuery } from '@tanstack/react-query';
import { fetchTeamPlaceMembers } from '~/apis/team';
import { STALE_TIME } from '~/constants/query';

export const useFetchTeamPlaceMembers = (teamPlaceId: number) => {
  const { data } = useQuery(
    ['teamPlaceMembers', teamPlaceId],
    () => fetchTeamPlaceMembers(teamPlaceId),
    {
      enabled: teamPlaceId > 0,
      staleTime: STALE_TIME.TEAM_PLACE_MEMBERS,
    },
  );

  const { members } = data ?? {};

  return { members };
};
