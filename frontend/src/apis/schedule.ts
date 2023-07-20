import { http } from '~/apis/http';
import type { Schedule, ScheduleWithoutId } from '~/types/schedule';

export const fetchSchedules = (
  teamPlaceId: number,
  year: number,
  month: number,
) => {
  return http.get<Schedule[]>(
    `/api/team-place/${teamPlaceId}/calendar/schedules?year=${year}&month=${month}`,
  );
};

export const sendSchedule = (teamPlaceId: number, body: ScheduleWithoutId) => {
  return http.post(`/api/team-place/${teamPlaceId}/calendar/schedules`, body);
};
