import { useQuery } from '@tanstack/react-query';
import { fetchMySchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';

export const useFetchMyDailySchedules = (startDate: string) => {
  const { data } = useQuery(
    ['myDailySchedules', startDate],
    () => fetchMySchedules(startDate, startDate),
    {
      staleTime: STALE_TIME.MY_DAILY_SCHEDULES,
    },
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
