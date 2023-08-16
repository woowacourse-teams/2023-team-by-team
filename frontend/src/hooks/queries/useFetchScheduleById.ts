import { useQuery } from '@tanstack/react-query';
import { fetchScheduleById } from '~/apis/schedule';

export const useFetchScheduleById = (
  teamPlaceId: number,
  scheduleId: number,
) => {
  const { data: scheduleById } = useQuery(
    ['schedule', teamPlaceId, scheduleId],
    () => fetchScheduleById(teamPlaceId, scheduleId),
    {
      enabled: teamPlaceId > 0,
    },
  );

  return { scheduleById };
};
