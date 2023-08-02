import { useQuery } from '@tanstack/react-query';
import { fetchMySchedules } from '~/apis/schedule';

export const useFetchMyDailySchedules = (
  year: number,
  month: number,
  day: number,
) => {
  const { data } = useQuery(['myDailySchedules', year, month, day], () =>
    fetchMySchedules(year, month + 1, day),
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
