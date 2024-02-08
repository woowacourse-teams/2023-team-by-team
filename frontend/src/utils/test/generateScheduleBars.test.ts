import { generateScheduleBars } from '~/utils/generateScheduleBars';
import type { GeneratedScheduleBar, Schedule } from '~/types/schedule';

const removeIdFromScheduleBars = (scheduleBars: GeneratedScheduleBar[]) => {
  /* eslint-disable-next-line */
  const scheduleBarsWithoutId = scheduleBars.map(({ id, ...rest }) => {
    return rest;
  });

  return scheduleBarsWithoutId;
};

describe('Test #1 - 스케줄 바 기본 기능 테스트', () => {
  it('하나의 스케줄 정보와 연/월에 대한 정보가 주어지면, 주어진 정보에 해당하는 스케줄 바를 반환해야 한다.', () => {
    const schedules: Schedule[] = [
      {
        id: 20,
        title: '내 일정',
        startDateTime: '2023-07-24 00:00',
        endDateTime: '2023-07-26 23:59',
      },
    ];

    const expectedResult = [
      {
        scheduleId: 20,
        title: '내 일정',
        row: 4,
        column: 1,
        duration: 3,
        level: 0,
        roundedStart: true,
        roundedEnd: true,
        schedule: {
          id: 20,
          title: '내 일정',
          startDateTime: '2023-07-24 00:00',
          endDateTime: '2023-07-26 23:59',
        },
      },
    ];

    expect(
      removeIdFromScheduleBars(generateScheduleBars(2023, 6, schedules)),
    ).toEqual(expectedResult);
  });

  it('여러 개의 스케줄 정보와 연/월에 대한 정보가 주어지면, 주어진 정보에 해당하는 스케줄 바를 반환해야 한다.', () => {
    const schedules: Schedule[] = [
      {
        id: 116,
        title: '첫 번째 일정',
        startDateTime: '2023-07-23 00:00',
        endDateTime: '2023-07-24 23:59',
      },
      {
        id: 225,
        title: '두 번째 일정',
        startDateTime: '2023-07-26 12:00',
        endDateTime: '2023-07-28 13:59',
      },
      {
        id: 932,
        title: '세 번째 일정',
        startDateTime: '2023-07-29 23:58',
        endDateTime: '2023-07-29 23:59',
      },
    ];

    const expectedResult = [
      {
        scheduleId: 116,
        title: '첫 번째 일정',
        row: 4,
        column: 0,
        duration: 2,
        level: 0,
        roundedStart: true,
        roundedEnd: true,
        schedule: {
          id: 116,
          title: '첫 번째 일정',
          startDateTime: '2023-07-23 00:00',
          endDateTime: '2023-07-24 23:59',
        },
      },
      {
        scheduleId: 225,
        title: '두 번째 일정',
        row: 4,
        column: 3,
        duration: 3,
        level: 0,
        roundedStart: true,
        roundedEnd: true,
        schedule: {
          id: 225,
          title: '두 번째 일정',
          startDateTime: '2023-07-26 12:00',
          endDateTime: '2023-07-28 13:59',
        },
      },
      {
        scheduleId: 932,
        title: '세 번째 일정',
        row: 4,
        column: 6,
        duration: 1,
        level: 0,
        roundedStart: true,
        roundedEnd: true,
        schedule: {
          id: 932,
          title: '세 번째 일정',
          startDateTime: '2023-07-29 23:58',
          endDateTime: '2023-07-29 23:59',
        },
      },
    ];

    expect(
      removeIdFromScheduleBars(generateScheduleBars(2023, 6, schedules)),
    ).toEqual(expectedResult);
  });

  it('서로 다른 주차의 일정이 주어지더라도 올바른 결과를 반환해야 한다.', () => {
    const schedules: Schedule[] = [
      {
        id: 97,
        title: '1주차의 일정',
        startDateTime: '2023-07-01 17:00',
        endDateTime: '2023-07-01 20:00',
      },
      {
        id: 106,
        title: '3주차의 일정',
        startDateTime: '2023-07-10 10:00',
        endDateTime: '2023-07-12 18:00',
      },
    ];

    const expectedResult = [
      {
        scheduleId: 97,
        title: '1주차의 일정',
        row: 0,
        column: 6,
        duration: 1,
        level: 0,
        roundedStart: true,
        roundedEnd: true,
        schedule: {
          id: 97,
          title: '1주차의 일정',
          startDateTime: '2023-07-01 17:00',
          endDateTime: '2023-07-01 20:00',
        },
      },
      {
        scheduleId: 106,
        title: '3주차의 일정',
        row: 2,
        column: 1,
        duration: 3,
        level: 0,
        roundedStart: true,
        roundedEnd: true,
        schedule: {
          id: 106,
          title: '3주차의 일정',
          startDateTime: '2023-07-10 10:00',
          endDateTime: '2023-07-12 18:00',
        },
      },
    ];

    expect(
      removeIdFromScheduleBars(generateScheduleBars(2023, 6, schedules)),
    ).toEqual(expectedResult);
  });
});

describe('Test #2 - 여러 주에 걸친 일정 테스트', () => {
  it('여러 주에 걸친 일정이 주어졌을 경우, 스케줄 바를 여러 개로 쪼갠 결과를 반환해야 한다.', () => {
    const schedules: Schedule[] = [
      {
        id: 1105,
        title: '바쁜 필립의 3주짜리 일정',
        startDateTime: '2023-06-26 00:00',
        endDateTime: '2023-07-12 23:59',
      },
    ];

    const expectedResult = [
      {
        scheduleId: 1105,
        title: '바쁜 필립의 3주짜리 일정',
        row: 0,
        column: 1,
        duration: 6,
        level: 0,
        roundedStart: true,
        roundedEnd: false,
        schedule: {
          id: 1105,
          title: '바쁜 필립의 3주짜리 일정',
          startDateTime: '2023-06-26 00:00',
          endDateTime: '2023-07-12 23:59',
        },
      },
      {
        scheduleId: 1105,
        title: '바쁜 필립의 3주짜리 일정',
        row: 1,
        column: 0,
        duration: 7,
        level: 0,
        roundedStart: false,
        roundedEnd: false,
        schedule: {
          id: 1105,
          title: '바쁜 필립의 3주짜리 일정',
          startDateTime: '2023-06-26 00:00',
          endDateTime: '2023-07-12 23:59',
        },
      },
      {
        scheduleId: 1105,
        title: '바쁜 필립의 3주짜리 일정',
        row: 2,
        column: 0,
        duration: 4,
        level: 0,
        roundedStart: false,
        roundedEnd: true,
        schedule: {
          id: 1105,
          title: '바쁜 필립의 3주짜리 일정',
          startDateTime: '2023-06-26 00:00',
          endDateTime: '2023-07-12 23:59',
        },
      },
    ];

    expect(
      removeIdFromScheduleBars(generateScheduleBars(2023, 6, schedules)),
    ).toEqual(expectedResult);
  });
});

describe('Test #3 - 달의 시작과 끝에서 잘리는 일정 테스트', () => {
  it('시작일이 달력의 바깥에 있을 경우, 현재 달에 해당하는 부분만 잘라 반환해야 한다.', () => {
    const schedules: Schedule[] = [
      {
        id: 987,
        title: '저번 달부터 이어져 온 유스의 일정',
        startDateTime: '2023-04-05 11:00',
        endDateTime: '2023-06-28 23:35',
      },
    ];

    const expectedResult = [
      {
        scheduleId: 987,
        title: '저번 달부터 이어져 온 유스의 일정',
        row: 0,
        column: 0,
        duration: 4,
        level: 0,
        roundedStart: false,
        roundedEnd: true,
        schedule: {
          id: 987,
          title: '저번 달부터 이어져 온 유스의 일정',
          startDateTime: '2023-04-05 11:00',
          endDateTime: '2023-06-28 23:35',
        },
      },
    ];

    expect(
      removeIdFromScheduleBars(generateScheduleBars(2023, 6, schedules)),
    ).toEqual(expectedResult);
  });

  it('완료일이 달력의 바깥에 있을 경우, 현재 달에 해당하는 부분만 잘라 반환해야 한다.', () => {
    const schedules: Schedule[] = [
      {
        id: 1256,
        title: '팀바팀의 일정(끝날 일 없음)',
        startDateTime: '2023-07-26 00:00',
        endDateTime: '2099-12-31 10:50',
      },
    ];

    const expectedResult = [
      {
        scheduleId: 1256,
        title: '팀바팀의 일정(끝날 일 없음)',
        row: 4,
        column: 3,
        duration: 4,
        level: 0,
        roundedStart: true,
        roundedEnd: false,
        schedule: {
          id: 1256,
          title: '팀바팀의 일정(끝날 일 없음)',
          startDateTime: '2023-07-26 00:00',
          endDateTime: '2099-12-31 10:50',
        },
      },
      {
        scheduleId: 1256,
        title: '팀바팀의 일정(끝날 일 없음)',
        row: 5,
        column: 0,
        duration: 7,
        level: 0,
        roundedStart: false,
        roundedEnd: false,
        schedule: {
          id: 1256,
          title: '팀바팀의 일정(끝날 일 없음)',
          startDateTime: '2023-07-26 00:00',
          endDateTime: '2099-12-31 10:50',
        },
      },
    ];

    expect(
      removeIdFromScheduleBars(generateScheduleBars(2023, 6, schedules)),
    ).toEqual(expectedResult);
  });

  it('시작일과 완료일 모두가 현재 달의 범위 바깥에 있을 경우, 현재 달에 해당하는 부분만 잘라 반환해야 한다.', () => {
    const schedules: Schedule[] = [
      {
        id: 1078,
        title: '우아한테크코스 전체 과정',
        startDateTime: '2023-02-08 00:00',
        endDateTime: '2023-11-15 18:00',
      },
    ];

    const expectedResult = [
      {
        scheduleId: 1078,
        title: '우아한테크코스 전체 과정',
        row: 0,
        column: 0,
        duration: 7,
        level: 0,
        roundedStart: false,
        roundedEnd: false,
        schedule: {
          id: 1078,
          title: '우아한테크코스 전체 과정',
          startDateTime: '2023-02-08 00:00',
          endDateTime: '2023-11-15 18:00',
        },
      },
      {
        scheduleId: 1078,
        title: '우아한테크코스 전체 과정',
        row: 1,
        column: 0,
        duration: 7,
        level: 0,
        roundedStart: false,
        roundedEnd: false,
        schedule: {
          id: 1078,
          title: '우아한테크코스 전체 과정',
          startDateTime: '2023-02-08 00:00',
          endDateTime: '2023-11-15 18:00',
        },
      },
      {
        scheduleId: 1078,
        title: '우아한테크코스 전체 과정',
        row: 2,
        column: 0,
        duration: 7,
        level: 0,
        roundedStart: false,
        roundedEnd: false,
        schedule: {
          id: 1078,
          title: '우아한테크코스 전체 과정',
          startDateTime: '2023-02-08 00:00',
          endDateTime: '2023-11-15 18:00',
        },
      },
      {
        scheduleId: 1078,
        title: '우아한테크코스 전체 과정',
        row: 3,
        column: 0,
        duration: 7,
        level: 0,
        roundedStart: false,
        roundedEnd: false,
        schedule: {
          id: 1078,
          title: '우아한테크코스 전체 과정',
          startDateTime: '2023-02-08 00:00',
          endDateTime: '2023-11-15 18:00',
        },
      },
      {
        scheduleId: 1078,
        title: '우아한테크코스 전체 과정',
        row: 4,
        column: 0,
        duration: 7,
        level: 0,
        roundedStart: false,
        roundedEnd: false,
        schedule: {
          id: 1078,
          title: '우아한테크코스 전체 과정',
          startDateTime: '2023-02-08 00:00',
          endDateTime: '2023-11-15 18:00',
        },
      },
      {
        scheduleId: 1078,
        title: '우아한테크코스 전체 과정',
        row: 5,
        column: 0,
        duration: 7,
        level: 0,
        roundedStart: false,
        roundedEnd: false,
        schedule: {
          id: 1078,
          title: '우아한테크코스 전체 과정',
          startDateTime: '2023-02-08 00:00',
          endDateTime: '2023-11-15 18:00',
        },
      },
    ];

    expect(
      removeIdFromScheduleBars(generateScheduleBars(2023, 6, schedules)),
    ).toEqual(expectedResult);
  });
});

describe('Test #4 - 스케줄 바가 겹칠 경우의 테스트', () => {
  it('스케줄 바가 겹칠 경우, 정해진 조건에 따라 스케줄 바를 배치하기 위한 레벨 정보가 포함된 채 결과가 반환되어야 한다.', () => {
    const schedules: Schedule[] = [
      {
        id: 1982,
        title: 'Level 0',
        startDateTime: '2023-07-17 00:00',
        endDateTime: '2023-07-19 23:59',
      },
      {
        id: 1105,
        title: 'Level 1',
        startDateTime: '2023-07-18 00:00',
        endDateTime: '2023-07-20 23:59',
      },
      {
        id: 3493,
        title: 'Level 2',
        startDateTime: '2023-07-19 00:00',
        endDateTime: '2023-07-19 23:59',
      },
      {
        id: 2984,
        title: 'Level 0-1',
        startDateTime: '2023-07-21 00:00',
        endDateTime: '2023-07-23 23:59',
      },
      {
        id: 7163,
        title: 'Level 1-1',
        startDateTime: '2023-07-22 00:00',
        endDateTime: '2023-07-25 23:59',
      },
    ];

    const expectedResult = [
      {
        scheduleId: 1982,
        title: 'Level 0',
        row: 3,
        column: 1,
        duration: 3,
        level: 0,
        roundedStart: true,
        roundedEnd: true,
        schedule: {
          id: 1982,
          title: 'Level 0',
          startDateTime: '2023-07-17 00:00',
          endDateTime: '2023-07-19 23:59',
        },
      },
      {
        scheduleId: 1105,
        title: 'Level 1',
        row: 3,
        column: 2,
        duration: 3,
        level: 1,
        roundedStart: true,
        roundedEnd: true,
        schedule: {
          id: 1105,
          title: 'Level 1',
          startDateTime: '2023-07-18 00:00',
          endDateTime: '2023-07-20 23:59',
        },
      },
      {
        scheduleId: 3493,
        title: 'Level 2',
        row: 3,
        column: 3,
        duration: 1,
        level: 2,
        roundedStart: true,
        roundedEnd: true,
        schedule: {
          id: 3493,
          title: 'Level 2',
          startDateTime: '2023-07-19 00:00',
          endDateTime: '2023-07-19 23:59',
        },
      },
      {
        scheduleId: 2984,
        title: 'Level 0-1',
        row: 3,
        column: 5,
        duration: 2,
        level: 0,
        roundedStart: true,
        roundedEnd: false,
        schedule: {
          id: 2984,
          title: 'Level 0-1',
          startDateTime: '2023-07-21 00:00',
          endDateTime: '2023-07-23 23:59',
        },
      },
      {
        scheduleId: 2984,
        title: 'Level 0-1',
        row: 4,
        column: 0,
        duration: 1,
        level: 0,
        roundedStart: false,
        roundedEnd: true,
        schedule: {
          id: 2984,
          title: 'Level 0-1',
          startDateTime: '2023-07-21 00:00',
          endDateTime: '2023-07-23 23:59',
        },
      },
      {
        scheduleId: 7163,
        title: 'Level 1-1',
        row: 3,
        column: 6,
        duration: 1,
        level: 1,
        roundedStart: true,
        roundedEnd: false,
        schedule: {
          id: 7163,
          title: 'Level 1-1',
          startDateTime: '2023-07-22 00:00',
          endDateTime: '2023-07-25 23:59',
        },
      },
      {
        scheduleId: 7163,
        title: 'Level 1-1',
        row: 4,
        column: 0,
        duration: 3,
        level: 1,
        roundedStart: false,
        roundedEnd: true,
        schedule: {
          id: 7163,
          title: 'Level 1-1',
          startDateTime: '2023-07-22 00:00',
          endDateTime: '2023-07-25 23:59',
        },
      },
    ];

    expect(
      removeIdFromScheduleBars(generateScheduleBars(2023, 6, schedules)),
    ).toEqual(expectedResult);
  });

  it('스케줄 바가 제대로 정렬되지 않은 채 주어져도, 일관된 결과를 반환해야 한다.', () => {
    const schedules: Schedule[] = [
      {
        id: 7163,
        title: 'Level 1-1',
        startDateTime: '2023-07-22 00:00',
        endDateTime: '2023-07-25 23:59',
      },
      {
        id: 3493,
        title: 'Level 2',
        startDateTime: '2023-07-19 00:00',
        endDateTime: '2023-07-19 23:59',
      },
      {
        id: 2984,
        title: 'Level 0-1',
        startDateTime: '2023-07-21 00:00',
        endDateTime: '2023-07-23 23:59',
      },
      {
        id: 1105,
        title: 'Level 1',
        startDateTime: '2023-07-18 00:00',
        endDateTime: '2023-07-20 23:59',
      },
      {
        id: 1982,
        title: 'Level 0',
        startDateTime: '2023-07-17 00:00',
        endDateTime: '2023-07-19 23:59',
      },
    ];

    const expectedResult = [
      {
        scheduleId: 1982,
        title: 'Level 0',
        row: 3,
        column: 1,
        duration: 3,
        level: 0,
        roundedStart: true,
        roundedEnd: true,
        schedule: {
          id: 1982,
          title: 'Level 0',
          startDateTime: '2023-07-17 00:00',
          endDateTime: '2023-07-19 23:59',
        },
      },
      {
        scheduleId: 1105,
        title: 'Level 1',
        row: 3,
        column: 2,
        duration: 3,
        level: 1,
        roundedStart: true,
        roundedEnd: true,
        schedule: {
          id: 1105,
          title: 'Level 1',
          startDateTime: '2023-07-18 00:00',
          endDateTime: '2023-07-20 23:59',
        },
      },
      {
        scheduleId: 3493,
        title: 'Level 2',
        row: 3,
        column: 3,
        duration: 1,
        level: 2,
        roundedStart: true,
        roundedEnd: true,
        schedule: {
          id: 3493,
          title: 'Level 2',
          startDateTime: '2023-07-19 00:00',
          endDateTime: '2023-07-19 23:59',
        },
      },
      {
        scheduleId: 2984,
        title: 'Level 0-1',
        row: 3,
        column: 5,
        duration: 2,
        level: 0,
        roundedStart: true,
        roundedEnd: false,
        schedule: {
          id: 2984,
          title: 'Level 0-1',
          startDateTime: '2023-07-21 00:00',
          endDateTime: '2023-07-23 23:59',
        },
      },
      {
        scheduleId: 2984,
        title: 'Level 0-1',
        row: 4,
        column: 0,
        duration: 1,
        level: 0,
        roundedStart: false,
        roundedEnd: true,
        schedule: {
          id: 2984,
          title: 'Level 0-1',
          startDateTime: '2023-07-21 00:00',
          endDateTime: '2023-07-23 23:59',
        },
      },
      {
        scheduleId: 7163,
        title: 'Level 1-1',
        row: 3,
        column: 6,
        duration: 1,
        level: 1,
        roundedStart: true,
        roundedEnd: false,
        schedule: {
          id: 7163,
          title: 'Level 1-1',
          startDateTime: '2023-07-22 00:00',
          endDateTime: '2023-07-25 23:59',
        },
      },
      {
        scheduleId: 7163,
        title: 'Level 1-1',
        row: 4,
        column: 0,
        duration: 3,
        level: 1,
        roundedStart: false,
        roundedEnd: true,
        schedule: {
          id: 7163,
          title: 'Level 1-1',
          startDateTime: '2023-07-22 00:00',
          endDateTime: '2023-07-25 23:59',
        },
      },
    ];

    expect(
      removeIdFromScheduleBars(generateScheduleBars(2023, 6, schedules)),
    ).toEqual(expectedResult);
  });
});

describe('Test #5 - 잘못된 일정에 대한 테스트', () => {
  it('시작일보다 완료일이 앞서는 일정의 경우, 랜더링에 포함되지 않아야 한다.', () => {
    const schedules: Schedule[] = [
      {
        id: 342,
        title: '말도 안 되는 일정',
        startDateTime: '2023-07-01 00:00',
        endDateTime: '2023-06-30 00:00',
      },
    ];

    const expectedResult: unknown[] = [];

    expect(
      removeIdFromScheduleBars(generateScheduleBars(2023, 6, schedules)),
    ).toEqual(expectedResult);
  });

  it('시작일보다 완료일이 앞서는 일정과 정상적인 일정이 있을 경우, 정상적인 일정만이 반환되어야 하며, 레벨 역시 잘못된 일정에 의해 영향을 받아서는 안 된다.', () => {
    const schedules: Schedule[] = [
      {
        id: 1105,
        title: '말도 안 되는 일정',
        startDateTime: '2023-07-07 00:00',
        endDateTime: '2023-07-04 00:00',
      },
      {
        id: 972,
        title: '정상적인 일정',
        startDateTime: '2023-07-05 00:00',
        endDateTime: '2023-07-08 00:00',
      },
    ];

    const expectedResult = [
      {
        scheduleId: 972,
        title: '정상적인 일정',
        row: 1,
        column: 3,
        duration: 4,
        level: 0,
        roundedStart: true,
        roundedEnd: true,
        schedule: {
          id: 972,
          title: '정상적인 일정',
          startDateTime: '2023-07-05 00:00',
          endDateTime: '2023-07-08 00:00',
        },
      },
    ];

    expect(
      removeIdFromScheduleBars(generateScheduleBars(2023, 6, schedules)),
    ).toEqual(expectedResult);
  });
});
