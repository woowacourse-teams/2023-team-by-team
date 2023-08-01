import { useQuery } from '@tanstack/react-query';
import { fetchMySchedules } from '~/apis/schedule';

export const useFetchMyDailySchedules = (
  year: number,
  month: number,
  date: number,
) => {
  const { data } = useQuery(['myDailySchedules', year, month, date], () =>
    fetchMySchedules(year, month + 1, date),
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
