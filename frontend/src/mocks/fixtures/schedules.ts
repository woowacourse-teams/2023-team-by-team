import type { Schedule, ScheduleWithTeamPlaceId } from '~/types/schedule';

export const schedules: Schedule[] = [
  {
    id: 0,
    title: 'test0',
    startDateTime: '2023-11-13 00:00',
    endDateTime: '2023-11-14 23:59',
  },
  {
    id: 1,
    title: 'test1',
    startDateTime: '2023-07-13 01:00',
    endDateTime: '2023-07-14 01:00',
  },
  {
    id: 2,
    title: 'test2',
    startDateTime: '2023-07-14 02:00',
    endDateTime: '2023-07-15 02:00',
  },
  {
    id: 3,
    title: 'test3',
    startDateTime: '2023-07-15 03:00',
    endDateTime: '2023-07-16 03:00',
  },
  {
    id: 4,
    title: 'test4',
    startDateTime: '2023-07-16 04:00',
    endDateTime: '2023-07-17 04:00',
  },
  {
    id: 5,
    title: 'test5',
    startDateTime: '2023-07-28 05:00',
    endDateTime: '2023-07-28 05:00',
  },
  {
    id: 6,
    title: 'test6',
    startDateTime: '2023-07-31 05:00',
    endDateTime: '2023-08-02 05:00',
  },
  {
    id: 7,
    title: 'test7',
    startDateTime: '2023-06-30 05:00',
    endDateTime: '2023-07-02 05:00',
  },
  {
    id: 8,
    title: 'test8',
    startDateTime: '2023-07-31 05:00',
    endDateTime: '2023-08-02 05:00',
  },
  {
    id: 9,
    title: 'test9',
    startDateTime: '2023-07-31 05:00',
    endDateTime: '2023-08-02 05:00',
  },
  {
    id: 10,
    title: 'test10',
    startDateTime: '2023-07-31 05:00',
    endDateTime: '2023-08-02 05:00',
  },
  {
    id: 11,
    title: 'longlonglonglonglonglonglonglonglonglonglonglonglonglongSchedule',
    startDateTime: '2023-09-30 05:00',
    endDateTime: '2023-10-02 05:00',
  },
  {
    id: 12,
    title: '이전 달 일정',
    startDateTime: '2023-11-27 10:00',
    endDateTime: '2023-11-30 18:00',
  },
  {
    id: 13,
    title: '이번 달과 이전 달에 겹친 일정',
    startDateTime: '2023-11-29 10:00',
    endDateTime: '2023-12-01 18:00',
  },
  {
    id: 14,
    title: '이번 달 일정',
    startDateTime: '2023-12-12 10:00',
    endDateTime: '2023-12-14 18:00',
  },
  {
    id: 15,
    title: '이번 달과 다음 달에 걸친 일정',
    startDateTime: '2023-12-29 10:00',
    endDateTime: '2024-01-01 18:00',
  },
  {
    id: 16,
    title: '다음 달 일정',
    startDateTime: '2024-01-01 10:00',
    endDateTime: '2024-01-03 18:00',
  },
  {
    id: 17,
    title: '다음 달 일정 2',
    startDateTime: '2024-01-02 10:00',
    endDateTime: '2024-01-15 18:00',
  },
];

export const mySchedules: ScheduleWithTeamPlaceId[] = [
  {
    id: 0,
    teamPlaceId: 1,
    title: 'test0',
    startDateTime: '2023-07-13 00:00',
    endDateTime: '2023-07-14 23:59',
  },
  {
    id: 1,
    teamPlaceId: 2,
    title: 'test1',
    startDateTime: '2023-07-13 01:00',
    endDateTime: '2023-07-14 01:00',
  },
  {
    id: 2,
    teamPlaceId: 3,
    title: 'test2',
    startDateTime: '2023-07-14 02:00',
    endDateTime: '2023-07-15 02:00',
  },

  {
    id: 3,
    teamPlaceId: 3,
    title: 'test3',
    startDateTime: '2023-07-16 03:00',
    endDateTime: '2023-07-16 03:00',
  },
  {
    id: 4,
    teamPlaceId: 1,
    title: 'test4',
    startDateTime: '2023-07-17 04:00',
    endDateTime: '2023-07-17 04:00',
  },
  {
    id: 5,
    teamPlaceId: 2,
    title: 'test5',
    startDateTime: '2023-07-28 05:00',
    endDateTime: '2023-07-28 05:00',
  },
  {
    id: 6,
    teamPlaceId: 3,
    title: 'test6',
    startDateTime: '2023-07-31 05:00',
    endDateTime: '2023-08-02 05:00',
  },
  {
    id: 7,
    teamPlaceId: 1,
    title: 'test7',
    startDateTime: '2023-06-30 05:00',
    endDateTime: '2023-07-02 05:00',
  },
];
