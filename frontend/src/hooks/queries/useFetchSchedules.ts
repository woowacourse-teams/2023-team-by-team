import { useQuery } from '@tanstack/react-query';
import { fetchSchedules } from '~/apis/schedule';

export const useFetchSchedules = (
  teamPlaceId: number,
  year: number,
  month: number,
) => {
  const { data } = useQuery(
    ['schedules', teamPlaceId, year, month],
    () => fetchSchedules(teamPlaceId, year, month + 1),
    {
      enabled: teamPlaceId > 0,
    },
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
