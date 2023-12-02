import { useQuery } from '@tanstack/react-query';
import { fetchMySchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';

export const useFetchMySchedules = (year: number, month: number) => {
  const { data } = useQuery(
    ['mySchedules', year, month],
    () => fetchMySchedules(year, month + 1),
    {
      staleTime: STALE_TIME.MY_SCHEDULES,
    },
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
