import { useQueryClient } from '@tanstack/react-query';
import { fetchSchedules } from '~/apis/schedule';

export const usePrefetchSchedules = async (
  teamPlaceId: number,
  year: number,
  month: number,
) => {
  const queryClient = useQueryClient();

  await queryClient.prefetchQuery(['schedules', teamPlaceId, year, month], () =>
    // NOTE: 백엔드에 실제 월을 보내기 위해 1을 더해서 요청을 보낸다.
    fetchSchedules(teamPlaceId, year, month + 1),
  );
};
