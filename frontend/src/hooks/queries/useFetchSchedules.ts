import { useQuery } from '@tanstack/react-query';
import { fetchSchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';
import type { DateRange } from '~/types/schedule';

export const useFetchSchedules = (
  teamPlaceId: number,
  dateRange: DateRange,
) => {
  const { startDate, endDate } = dateRange;

  const { data } = useQuery(
    ['schedules', teamPlaceId, startDate, endDate],
    () => fetchSchedules(teamPlaceId, startDate, endDate),
    {
      enabled: teamPlaceId > 0,
      staleTime: STALE_TIME.SCHEDULES,
    },
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
