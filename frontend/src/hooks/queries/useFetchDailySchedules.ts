import { useQuery } from '@tanstack/react-query';
import { fetchSchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';

export const useFetchDailySchedules = (
  teamPlaceId: number,
  year: number,
  month: number,
  day: number,
) => {
  const stringYear = String(year).padStart(4, '0');
  const stringMonth = String(month + 1).padStart(2, '0');
  const stringDay = String(day).padStart(2, '0');

  const { data } = useQuery(
    ['dailySchedules', year, month, day],
    () =>
      fetchSchedules(
        teamPlaceId,
        `${stringYear}${stringMonth}${stringDay}`,
        `${stringYear}${stringMonth}${stringDay}`,
      ),
    {
      enabled: teamPlaceId > 0,
      staleTime: STALE_TIME.DAILY_SCHEDULES,
    },
  );

  if (data === undefined) return [];

  const { schedules } = data;

  return schedules;
};
