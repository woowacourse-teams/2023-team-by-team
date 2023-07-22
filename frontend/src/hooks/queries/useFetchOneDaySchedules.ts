import { useQuery } from '@tanstack/react-query';
import { fetchSchedules } from '~/apis/schedule';

export const useFetchOneDaySchedules = (
  teamPlaceId: number,
  year: number,
  month: number,
  day: number,
) => {
  const { data } = useQuery(['oneDaySchedules', year, month, day], () =>
    fetchSchedules(teamPlaceId, year, month, day),
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
