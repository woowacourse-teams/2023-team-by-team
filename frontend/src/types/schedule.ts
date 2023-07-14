export interface Schedule {
  id: number;
  name: string;
  startDateTime: YYYYMMDDHHMM;
  endDateTime: YYYYMMDDHHMM;
}

export type ScheduleWithoutId = Omit<Schedule, 'id'>;

type YYYYMMDDHHMM = `${string}-${string}-${string} ${string}:${string}`;
