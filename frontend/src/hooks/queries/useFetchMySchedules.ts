import { useQuery } from '@tanstack/react-query';
import { fetchMySchedules } from '~/apis/schedule';

export const useFetchMySchedules = (year: number, month: number) => {
  const { data } = useQuery(['mySchedules', year, month], () =>
    fetchMySchedules(year, month + 1),
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
