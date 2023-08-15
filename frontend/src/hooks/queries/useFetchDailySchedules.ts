import { useQuery } from '@tanstack/react-query';
import { fetchSchedules } from '~/apis/schedule';

export const useFetchDailySchedules = (
  teamPlaceId: number,
  year: number,
  month: number,
  day: number,
) => {
  const { data } = useQuery(
    ['dailySchedules', year, month, day],
    () => fetchSchedules(teamPlaceId, year, month + 1, day),
    {
      enabled: teamPlaceId > 0,
    },
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
