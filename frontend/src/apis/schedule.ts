import { http } from '~/apis/http';
import type {
  Schedule,
  ScheduleWithTeamPlaceId,
  ScheduleWithoutId,
} from '~/types/schedule';

interface SchedulesResponse {
  schedules: Schedule[];
}

interface MySchedulesResponse {
  schedules: ScheduleWithTeamPlaceId[];
}

export const fetchSchedules = (
  teamPlaceId: number,
  year: number,
  month: number,
  day?: number,
) => {
  const query = day
    ? `year=${year}&month=${month}&day=${day}`
    : `year=${year}&month=${month}`;

  return http.get<SchedulesResponse>(
    `/api/team-place/${teamPlaceId}/calendar/schedules?${query}`,
  );
};

export const fetchMySchedules = (year: number, month: number, day?: number) => {
  const query = day
    ? `year=${year}&month=${month}&day=${day}`
    : `year=${year}&month=${month}`;

  return http.get<MySchedulesResponse>(`/api/my-calendar/schedules?${query}`);
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
