import { useQueryClient } from '@tanstack/react-query';
import { fetchSchedules } from '~/apis/schedule';

export const usePrefetchSchedules = async (
  teamPlaceId: number,
  year: number,
  month: number,
) => {
  const queryClient = useQueryClient();
  const enabled = teamPlaceId > 0;

  if (enabled) {
    await queryClient.prefetchQuery(
      ['schedules', teamPlaceId, year, month],
      () => fetchSchedules(teamPlaceId, year, month + 1),
    );
  }
};
