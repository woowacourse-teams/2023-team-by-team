import { useQuery } from '@tanstack/react-query';
import { fetchTeamLinks } from '~/apis/link';

export const useFetchTeamLinks = (teamPlaceId: number) => {
  const { data } = useQuery(['teamLinks'], () => fetchTeamLinks(teamPlaceId));

  if (data === undefined) return [];

  const { teamLinks } = data;

  console.log(teamLinks);

  return teamLinks;
};
