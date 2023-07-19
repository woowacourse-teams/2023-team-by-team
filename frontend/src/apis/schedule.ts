import { http } from '~/apis/http';
import type { Schedule } from '~/types/schedule';

export const fetchSchedules = (
  teamPlaceId: number,
  year: number,
  month: number,
) => {
  return http.get<Schedule[]>(
    `/api/team-place/${teamPlaceId}/calendar/schedules?year=${year}&month=${month}`,
  );
};
