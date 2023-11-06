import { useQueryClient } from '@tanstack/react-query';
import { fetchMySchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';

export const usePrefetchMySchedules = async (year: number, month: number) => {
  const queryKey = ['mySchedules', year, month];
  const queryClient = useQueryClient();

  await queryClient.prefetchQuery(
    queryKey,
    () => fetchMySchedules(year, month + 1),
    {
      staleTime: STALE_TIME.MY_SCHEDULES,
    },
  );
};
