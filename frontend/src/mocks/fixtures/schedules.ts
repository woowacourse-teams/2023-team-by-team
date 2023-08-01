import type { Schedule, ScheduleWithTeamPlaceId } from '~/types/schedule';

export const schedules: Schedule[] = [
  {
    id: 0,
    title: 'test0',
    startDateTime: '2023-07-13 00:00',
    endDateTime: '2023-07-14 23:59',
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
    startDateTime: '2023-07-15 03:00',
    endDateTime: '2023-07-16 03:00',
  },
  {
    id: 4,
    teamPlaceId: 1,
    title: 'test4',
    startDateTime: '2023-07-16 04:00',
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
