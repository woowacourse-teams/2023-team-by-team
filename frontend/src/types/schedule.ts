import type { MODAL_OPEN_TYPE } from '~/constants/calendar';
import type { CalendarSize } from '~/types/size';

export interface Schedule {
  id: number;
  title: string;
  startDateTime: YYYYMMDDHHMM;
  endDateTime: YYYYMMDDHHMM;
}

export interface ScheduleWithTeamPlaceId extends Schedule {
  teamPlaceId: number;
}

export type ScheduleWithoutId = Omit<Schedule, 'id'>;

export type YYYYMMDDHHMM = `${string}-${string}-${string} ${string}:${string}`;

export interface Position {
  row: number;
  column: number;
}

export interface SchedulePosition extends Position {
  level: number;
}

export interface ScheduleCircle {
  teamPlaceIds: number[];
}

export type ModalOpenType =
  (typeof MODAL_OPEN_TYPE)[keyof typeof MODAL_OPEN_TYPE];

export interface ScheduleWithTeamPlaceId extends Schedule {
  teamPlaceId: number;
}

export interface GeneratedScheduleBar {
  id: string;
  scheduleId: number;
  schedule: Schedule;
  title: string;
  row: number;
  column: number;
  duration: number;
  level: number;
  roundedStart: boolean;
  roundedEnd: boolean;
  calendarSize?: CalendarSize;
  mode?: 'normal' | 'no-interaction' | 'indicator';
}
