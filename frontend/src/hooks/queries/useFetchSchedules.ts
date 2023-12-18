import { useQuery } from '@tanstack/react-query';
import { fetchSchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';
import { generateYYYYMMDD } from '~/utils/generateYYYYMMDD';

export const useFetchSchedules = (
  teamPlaceId: number,
  startDate: Date,
  endDate: Date,
) => {
  const startDateFormat = generateYYYYMMDD(startDate);
  const endDateFormat = generateYYYYMMDD(endDate);

  const { data } = useQuery(
    ['schedules', teamPlaceId, startDateFormat, endDateFormat],
    () => fetchSchedules(teamPlaceId, startDateFormat, endDateFormat),
    {
      enabled: teamPlaceId > 0,
      staleTime: STALE_TIME.SCHEDULES,
    },
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
