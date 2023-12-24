import { useQueryClient } from '@tanstack/react-query';
import { fetchSchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';
import type { DateRange } from '~/types/schedule';

export const usePrefetchSchedules = async (
  teamPlaceId: number,
  dateRange: DateRange,
) => {
  const { startDate, endDate } = dateRange;
  const queryClient = useQueryClient();
  const enabled = teamPlaceId > 0;

  if (enabled) {
    await queryClient.prefetchQuery(
      ['schedules', teamPlaceId, startDate, endDate],
      () => fetchSchedules(teamPlaceId, startDate, endDate),
      {
        staleTime: STALE_TIME.SCHEDULES,
      },
    );
  }
};
