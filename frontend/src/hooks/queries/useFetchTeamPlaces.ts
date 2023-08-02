import { useQuery } from '@tanstack/react-query';
import { fetchTeamPlaces } from '~/apis/team';

export const useFetchTeamPlaces = () => {
  const { data } = useQuery(['teamPlaces'], () => fetchTeamPlaces());

  if (data === undefined) return [];

  const { teamPlaces } = data;

  return { teamPlaces };
};
