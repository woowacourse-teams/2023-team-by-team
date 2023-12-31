import { useQuery } from '@tanstack/react-query';
import { fetchSchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';

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
      staleTime: STALE_TIME.DAILY_SCHEDULES,
    },
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
