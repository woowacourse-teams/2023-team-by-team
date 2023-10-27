import { useQuery } from '@tanstack/react-query';
import { fetchTeamLinks } from '~/apis/link';
import { STALE_TIME } from '~/constants/query';

export const useFetchTeamLinks = (teamPlaceId: number) => {
  const { data } = useQuery(
    ['teamLinks', teamPlaceId],
    () => fetchTeamLinks(teamPlaceId),
    {
      enabled: teamPlaceId > 0,
      staleTime: STALE_TIME.TEAM_LINKS,
    },
  );

  if (data === undefined) return [];

  const { teamLinks } = data;

  return teamLinks;
};
