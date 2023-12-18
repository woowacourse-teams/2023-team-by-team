import { useQueryClient } from '@tanstack/react-query';
import { fetchSchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';
import { generateYYYYMMDD } from '~/utils/generateYYYYMMDD';

export const usePrefetchSchedules = async (
  teamPlaceId: number,
  startDate: Date,
  endDate: Date,
) => {
  const startDateFormat = generateYYYYMMDD(startDate);
  const endDateFormat = generateYYYYMMDD(endDate);

  const queryClient = useQueryClient();
  const enabled = teamPlaceId > 0;

  if (enabled) {
    await queryClient.prefetchQuery(
      ['schedules', teamPlaceId, startDateFormat, endDateFormat],
      () => fetchSchedules(teamPlaceId, startDateFormat, endDateFormat),
      {
        staleTime: STALE_TIME.SCHEDULES,
      },
    );
  }
};
