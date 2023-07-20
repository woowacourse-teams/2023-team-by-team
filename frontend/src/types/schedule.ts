import type { MODAL_TYPE_LIST } from '~/constants/calendar';

export interface Schedule {
  id: number;
  title: string;
  startDateTime: YYYYMMDDHHMM;
  endDateTime: YYYYMMDDHHMM;
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

export type Modal = (typeof MODAL_TYPE_LIST)[number];
