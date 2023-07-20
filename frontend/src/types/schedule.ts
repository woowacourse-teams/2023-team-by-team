import type { MODAL_OPEN_TYPE } from '~/constants/calendar';

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

export type ModalOpenType =
  (typeof MODAL_OPEN_TYPE)[keyof typeof MODAL_OPEN_TYPE];
