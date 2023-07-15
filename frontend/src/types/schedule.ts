export interface Schedule {
  id: number;
  title: string;
  startDateTime: YYYYMMDDHHMM;
  endDateTime: YYYYMMDDHHMM;
}

export type ScheduleWithoutId = Omit<Schedule, 'id'>;

type YYYYMMDDHHMM = `${string}-${string}-${string} ${string}:${string}`;
