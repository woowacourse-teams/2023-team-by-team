import { useQueryClient } from '@tanstack/react-query';
import { fetchMySchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';
import type { DateRange } from '~/types/schedule';

export const usePrefetchMySchedules = async (dateRange: DateRange) => {
  const { startDate, endDate } = dateRange;
  const queryKey = ['mySchedules', startDate, endDate];
  const queryClient = useQueryClient();

  await queryClient.prefetchQuery(
    queryKey,
    () => fetchMySchedules(startDate, endDate),
    {
      staleTime: STALE_TIME.MY_SCHEDULES,
    },
  );
};
