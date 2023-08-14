import { useQuery } from '@tanstack/react-query';
import { fetchTeamPlaceMembers } from '~/apis/team';

export const useFetchTeamPlaceMembers = (teamPlaceId: number) => {
  const { data } = useQuery(
    ['teamPlaceMembers', teamPlaceId],
    () => fetchTeamPlaceMembers(teamPlaceId),
    {
      enabled: teamPlaceId > 0,
    },
  );

  const { members } = data ?? {};

  return { members };
};
