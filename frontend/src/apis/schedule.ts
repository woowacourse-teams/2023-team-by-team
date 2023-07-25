import { http } from '~/apis/http';
import type { Schedule, ScheduleWithoutId } from '~/types/schedule';

export const fetchSchedules = (
  teamPlaceId: number,
  year: number,
  month: number,
  day?: number,
) => {
  const query = day
    ? `year=${year}&month=${month}&day=${day}`
    : `year=${year}&month=${month}`;

  return http.get<{
    schedules: Schedule[];
  }>(`/api/team-place/${teamPlaceId}/calendar/schedules?${query}`);
};

export const fetchScheduleById = (teamPlaceId: number, scheduleId: number) => {
  return http.get<Schedule>(
    `/api/team-place/${teamPlaceId}/calendar/schedules/${scheduleId}`,
  );
};

export const deleteSchedule = (teamPlaceId: number, scheduleId: number) => {
  return http.delete(
    `/api/team-place/${teamPlaceId}/calendar/schedules/${scheduleId}`,
  );
};

export const sendSchedule = (teamPlaceId: number, body: ScheduleWithoutId) => {
  return http.post(`/api/team-place/${teamPlaceId}/calendar/schedules`, body);
};

export const modifySchedule = (
  teamPlaceId: number,
  scheduleId: number,
  body: ScheduleWithoutId,
) => {
  return http.patch(
    `/api/team-place/${teamPlaceId}/calendar/schedules/${scheduleId}`,
    body,
  );
};
