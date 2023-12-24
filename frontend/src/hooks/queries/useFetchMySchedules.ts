import { useQuery } from '@tanstack/react-query';
import { fetchMySchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';
import type { DateRange } from '~/types/schedule';

export const useFetchMySchedules = (dateRange: DateRange) => {
  const { startDate, endDate } = dateRange;

  const { data } = useQuery(
    ['mySchedules', startDate, endDate],
    () => fetchMySchedules(startDate, endDate),
    {
      staleTime: STALE_TIME.SCHEDULES,
    },
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
