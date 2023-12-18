import { useQuery } from '@tanstack/react-query';
import { fetchMySchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';
import { generateYYYYMMDD } from '~/utils/generateYYYYMMDD';

export const useFetchMySchedules = (startDate: Date, endDate: Date) => {
  const startDateFormat = generateYYYYMMDD(startDate);
  const endDateFormat = generateYYYYMMDD(endDate);

  const { data } = useQuery(
    ['mySchedules', startDateFormat, endDateFormat],
    () => fetchMySchedules(startDateFormat, endDateFormat),
    {
      staleTime: STALE_TIME.SCHEDULES,
    },
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
