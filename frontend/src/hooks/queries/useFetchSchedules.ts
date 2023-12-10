import { useQueries } from '@tanstack/react-query';
import { fetchSchedules } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';
import type { Schedule } from '~/types/schedule';

export const useFetchSchedules = (
  teamPlaceId: number,
  year: number,
  month: number,
) => {
  const previousQueryYear = month === 0 ? year - 1 : year;
  const previousQueryMonth = month === 0 ? 12 : month;
  const nextQueryYear = month === 11 ? year + 1 : year;
  const nextQueryMonth = month === 11 ? 1 : month + 2;

  const [previousQuery, currentQuery, nextQuery] = useQueries({
    queries: [
      {
        queryKey: [
          'schedules',
          teamPlaceId,
          previousQueryYear,
          previousQueryMonth,
        ],
        queryFn: () =>
          fetchSchedules(teamPlaceId, previousQueryYear, previousQueryMonth),
        enabled: teamPlaceId > 0,
        staleTime: STALE_TIME.SCHEDULES,
      },
      {
        queryKey: ['schedules', teamPlaceId, year, month],
        queryFn: () => fetchSchedules(teamPlaceId, year, month + 1),
        enabled: teamPlaceId > 0,
        staleTime: STALE_TIME.SCHEDULES,
      },
      {
        queryKey: ['schedules', teamPlaceId, nextQueryYear, nextQueryMonth],
        queryFn: () =>
          fetchSchedules(teamPlaceId, nextQueryYear, nextQueryMonth),
        enabled: teamPlaceId > 0,
        staleTime: STALE_TIME.SCHEDULES,
      },
    ],
  });

  if (!previousQuery.data || !currentQuery.data || !nextQuery.data) {
    return [];
  }

  const rawSchedules = [
    ...previousQuery.data.schedules,
    ...currentQuery.data.schedules,
    ...nextQuery.data.schedules,
  ];

  const uniqueSchedules: Schedule[] = [];
  const appearedScheduleIds = new Set();

  rawSchedules.forEach((schedule) => {
    if (!appearedScheduleIds.has(schedule.id)) {
      uniqueSchedules.push(schedule);
      appearedScheduleIds.add(schedule.id);
    }
  });

  return uniqueSchedules;
};
