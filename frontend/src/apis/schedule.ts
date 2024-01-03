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

interface ICalendarResponse {
  url: string;
}

export const fetchSchedules = (
  teamPlaceId: number,
  startDate: string,
  endDate: string,
) => {
  return http.get<SchedulesResponse>(
    `/api/team-place/${teamPlaceId}/calendar/schedules?startDate=${startDate}&endDate=${endDate}`,
  );
};

export const fetchMySchedules = (startDate: string, endDate: string) => {
  return http.get<MySchedulesResponse>(
    `/api/my-calendar/schedules?startDate=${startDate}&endDate=${endDate}`,
  );
};

export const fetchScheduleById = (teamPlaceId: number, scheduleId: number) => {
  return http.get<Schedule>(
    `/api/team-place/${teamPlaceId}/calendar/schedules/${scheduleId}`,
  );
};

export const fetchICalendarUrl = (teamPlaceId: number) => {
  return http.get<ICalendarResponse>(
    `/api/team-place/${teamPlaceId}/icalendar-url`,
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
