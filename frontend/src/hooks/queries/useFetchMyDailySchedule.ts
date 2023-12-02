import { useQuery } from '@tanstack/react-query';
import { fetchMySchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';

export const useFetchMyDailySchedules = (
  year: number,
  month: number,
  day: number,
) => {
  const { data } = useQuery(
    ['myDailySchedules', year, month, day],
    () => fetchMySchedules(year, month + 1, day),
    {
      staleTime: STALE_TIME.MY_DAILY_SCHEDULES,
    },
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
