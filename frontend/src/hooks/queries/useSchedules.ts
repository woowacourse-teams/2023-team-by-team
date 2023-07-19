import { useQuery } from '@tanstack/react-query';
import { fetchSchedules } from '~/apis/schedule';

export const useSchedules = (
  teamPlaceId: number,
  year: number,
  month: number,
) => {
  const { data: schedules } = useQuery(['schedules'], () =>
    fetchSchedules(teamPlaceId, year, month),
  );

  return { schedules };
};
