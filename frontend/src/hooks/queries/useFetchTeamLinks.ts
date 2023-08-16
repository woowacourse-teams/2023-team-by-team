import { useQuery } from '@tanstack/react-query';
import { fetchTeamLinks } from '~/apis/link';

export const useFetchTeamLinks = (teamPlaceId: number) => {
  const { data } = useQuery(
    ['teamLinks', teamPlaceId],
    () => fetchTeamLinks(teamPlaceId),
    {
      enabled: teamPlaceId > 0,
    },
  );

  if (data === undefined) return [];

  const { teamLinks } = data;

  return teamLinks;
};
