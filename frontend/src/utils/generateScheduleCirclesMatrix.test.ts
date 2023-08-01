import { generateScheduleCirclesMatrix } from './generateScheduleCirclesMatrix';
import type { ScheduleWithTeamPlaceId } from '~/types/schedule';

describe('Test #1 - 스케줄 서클 기본 기능 테스트', () => {
  test('하나의 스케줄 정보와 연/월에 대한 정보가 주어지면, 주어진 정보에 해당하는 스케줄 서클 분포를 2차원 배열로 반환해야 한다.', () => {
    const schedules: ScheduleWithTeamPlaceId[] = [
      {
        id: 20,
        teamPlaceId: 0,
        title: '내 일정',
        startDateTime: '2023-07-24 00:00',
        endDateTime: '2023-07-26 23:59',
      },
    ];

    const expectedResult = [
      { teamPlaceIds: [] },
      { teamPlaceIds: [0] },
      { teamPlaceIds: [0] },
      { teamPlaceIds: [0] },
      { teamPlaceIds: [] },
      { teamPlaceIds: [] },
      { teamPlaceIds: [] },
    ];

    expect(generateScheduleCirclesMatrix(2023, 6, schedules)[4]).toEqual(
      expectedResult,
    );
  });

  test('여러 개의 스케줄 정보가 서로 겹치더라도, 올바른 결과를 반환해야 한다. 반환 시에는 아이디를 오름차순 정렬하여 반환하고, 한계 랜더링 개수를 넘기지 않도록 반환한다.', () => {
    const schedules: ScheduleWithTeamPlaceId[] = [
      {
        id: 116,
        teamPlaceId: 0,
        title: '엔델',
        startDateTime: '2023-07-31 00:00',
        endDateTime: '2023-08-03 23:59',
      },
      {
        id: 23,
        teamPlaceId: 4,
        title: '유스',
        startDateTime: '2023-08-08 23:58',
        endDateTime: '2023-08-28 23:59',
      },
      {
        id: 394,
        teamPlaceId: 9,
        title: '제임스',
        startDateTime: '2023-08-26 12:34',
        endDateTime: '2023-09-08 12:34',
      },
      {
        id: 890,
        teamPlaceId: 16,
        title: '브리',
        startDateTime: '2023-08-07 08:10',
        endDateTime: '2023-08-14 10:20',
      },
      {
        id: 225,
        teamPlaceId: 1,
        title: '필립',
        startDateTime: '2023-08-12 12:00',
        endDateTime: '2023-08-18 13:59',
      },
      {
        id: 320,
        teamPlaceId: 11,
        title: '요술토끼',
        startDateTime: '2023-08-13 11:00',
        endDateTime: '2023-08-13 15:20',
      },
      {
        id: 243,
        teamPlaceId: 5,
        title: '루루',
        startDateTime: '2023-08-24 11:02',
        endDateTime: '2023-09-08 14:03',
      },
      {
        id: 932,
        teamPlaceId: 3,
        title: '로이',
        startDateTime: '2023-08-30 23:58',
        endDateTime: '2023-09-05 23:59',
      },
      {
        id: 1108,
        teamPlaceId: 2,
        title: '성하',
        startDateTime: '2023-08-28 23:58',
        endDateTime: '2023-08-28 23:59',
      },
    ];

    const expectedResult = [
      [
        { teamPlaceIds: [] },
        { teamPlaceIds: [0] },
        { teamPlaceIds: [0] },
        { teamPlaceIds: [0] },
        { teamPlaceIds: [0] },
        { teamPlaceIds: [] },
        { teamPlaceIds: [] },
      ],
      [
        { teamPlaceIds: [] },
        { teamPlaceIds: [16] },
        { teamPlaceIds: [4, 16] },
        { teamPlaceIds: [4, 16] },
        { teamPlaceIds: [4, 16] },
        { teamPlaceIds: [4, 16] },
        { teamPlaceIds: [1, 4, 16] },
      ],
      [
        { teamPlaceIds: [1, 4, 11] },
        { teamPlaceIds: [1, 4, 16] },
        { teamPlaceIds: [1, 4] },
        { teamPlaceIds: [1, 4] },
        { teamPlaceIds: [1, 4] },
        { teamPlaceIds: [1, 4] },
        { teamPlaceIds: [4] },
      ],
      [
        { teamPlaceIds: [4] },
        { teamPlaceIds: [4] },
        { teamPlaceIds: [4] },
        { teamPlaceIds: [4] },
        { teamPlaceIds: [4, 5] },
        { teamPlaceIds: [4, 5] },
        { teamPlaceIds: [4, 5, 9] },
      ],
      [
        { teamPlaceIds: [4, 5, 9] },
        { teamPlaceIds: [2, 4, 5] },
        { teamPlaceIds: [5, 9] },
        { teamPlaceIds: [3, 5, 9] },
        { teamPlaceIds: [3, 5, 9] },
        { teamPlaceIds: [3, 5, 9] },
        { teamPlaceIds: [3, 5, 9] },
      ],
      [
        { teamPlaceIds: [3, 5, 9] },
        { teamPlaceIds: [3, 5, 9] },
        { teamPlaceIds: [3, 5, 9] },
        { teamPlaceIds: [5, 9] },
        { teamPlaceIds: [5, 9] },
        { teamPlaceIds: [5, 9] },
        { teamPlaceIds: [] },
      ],
    ];

    expect(generateScheduleCirclesMatrix(2023, 7, schedules)).toEqual(
      expectedResult,
    );
  });
});

describe('Test #2 - 범위를 벗어나는 일정 테스트', () => {
  test('일정이 해당 달력의 범위를 전부 또는 일부를 벗어날 경우, 달력에 해당하는 부분만 반환해야 한다.', () => {
    const schedules: ScheduleWithTeamPlaceId[] = [
      {
        id: 0,
        teamPlaceId: 0,
        title: '시작 부분이 잘리는 일정',
        startDateTime: '2023-07-26 00:00',
        endDateTime: '2023-08-03 23:59',
      },
      {
        id: 1,
        teamPlaceId: 1,
        title: '끝 부분이 잘리는 일정',
        startDateTime: '2023-09-01 00:00',
        endDateTime: '2023-09-12 23:59',
      },
      {
        id: 2,
        teamPlaceId: 2,
        title: '아예 해당 달의 범위 바깥에 있는 일정',
        startDateTime: '2023-01-12 00:00',
        endDateTime: '2023-01-13 23:59',
      },
      {
        id: 3,
        teamPlaceId: 3,
        title: '일정이 매우 길어 해당 달의 전체를 차지하는 일정',
        startDateTime: '2023-01-01 00:00',
        endDateTime: '2023-12-31 23:59',
      },
    ];

    const expectedResult = [
      [
        { teamPlaceIds: [0, 3] },
        { teamPlaceIds: [0, 3] },
        { teamPlaceIds: [0, 3] },
        { teamPlaceIds: [0, 3] },
        { teamPlaceIds: [0, 3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
      ],
      [
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
      ],
      [
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
      ],
      [
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
      ],
      [
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [3] },
        { teamPlaceIds: [1, 3] },
        { teamPlaceIds: [1, 3] },
      ],
      [
        { teamPlaceIds: [1, 3] },
        { teamPlaceIds: [1, 3] },
        { teamPlaceIds: [1, 3] },
        { teamPlaceIds: [1, 3] },
        { teamPlaceIds: [1, 3] },
        { teamPlaceIds: [1, 3] },
        { teamPlaceIds: [1, 3] },
      ],
    ];

    expect(generateScheduleCirclesMatrix(2023, 7, schedules)).toEqual(
      expectedResult,
    );
  });
});
