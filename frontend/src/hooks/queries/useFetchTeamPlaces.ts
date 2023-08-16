import { useQuery } from '@tanstack/react-query';
import { fetchTeamPlaces } from '~/apis/team';

export const useFetchTeamPlaces = () => {
  const { data, isFetched } = useQuery(['teamPlaces'], () => fetchTeamPlaces());

  if (data === undefined) return { teamPlaces: [], isFetched };

  const { teamPlaces } = data;

  return { teamPlaces, isFetched };
};
