import { useQueryClient } from '@tanstack/react-query';
import { fetchMySchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';
import { generateYYYYMMDD } from '~/utils/generateYYYYMMDD';

export const usePrefetchMySchedules = async (
  startDate: Date,
  endDate: Date,
) => {
  const startDateFormat = generateYYYYMMDD(startDate);
  const endDateFormat = generateYYYYMMDD(endDate);

  const queryKey = ['mySchedules', startDateFormat, endDateFormat];
  const queryClient = useQueryClient();

  await queryClient.prefetchQuery(
    queryKey,
    () => fetchMySchedules(startDateFormat, endDateFormat),
    {
      staleTime: STALE_TIME.MY_SCHEDULES,
    },
  );
};
