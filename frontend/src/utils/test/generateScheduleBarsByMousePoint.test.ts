import { generateScheduleBarsByMousePoint } from '~/utils/generateScheduleBarsByMousePoint';
import type {
  GeneratedScheduleBar,
  Schedule,
  YYYYMMDDHHMM,
} from '~/types/schedule';

const removeIdFromScheduleBars = (scheduleBars: GeneratedScheduleBar[]) => {
  /* eslint-disable-next-line */
  const scheduleBarsWithoutId = scheduleBars.map(({ id, ...rest }) => {
    return rest;
  });

  return scheduleBarsWithoutId;
};

const defaultParams = {
  year: 2023,
  month: 10,
  calendarWidth: 700,
  calendarHeight: 600,
  level: 0,
  calendarSize: 'md' as const,
};

type GeneratedScheduleBarWithoutId = Omit<GeneratedScheduleBar, 'id'>;

interface ResultValue {
  startDateTime: YYYYMMDDHHMM;
  endDateTime: YYYYMMDDHHMM;
  scheduleBars: GeneratedScheduleBarWithoutId[];
}

describe('Test #1 - 좌표 대응 테스트', () => {
  test('상대 좌표가 우측에 있을 경우, 그에 대응되는 날짜가 이동된 스케줄 바가 반환되어야 한다.', () => {
    const schedule: Schedule = {
      id: 1,
      title: '내 일정',
      startDateTime: '2023-11-14 00:00',
      endDateTime: '2023-11-16 23:59',
    };

    const params = {
      ...defaultParams,
      schedule,
      relativeX: 155,
      relativeY: 0,
    };

    const expectedResult: ResultValue = {
      startDateTime: '2023-11-16 00:00',
      endDateTime: '2023-11-18 23:59',
      scheduleBars: [
        {
          scheduleId: 1,
          title: '내 일정',
          row: 2,
          column: 4,
          duration: 3,
          level: 0,
          roundedStart: true,
          roundedEnd: true,
          schedule: {
            id: 1,
            title: '내 일정',
            startDateTime: '2023-11-16 00:00',
            endDateTime: '2023-11-18 23:59',
          },
          calendarSize: 'md',
        },
      ],
    };

    const { startDateTime, endDateTime, scheduleBars } =
      generateScheduleBarsByMousePoint(params);

    expect({
      startDateTime,
      endDateTime,
      scheduleBars: removeIdFromScheduleBars(scheduleBars),
    }).toEqual(expectedResult);
  });

  test('상대 좌표가 좌상단에 있을 경우, 그에 대응되는 날짜가 이동된 스케줄 바가 반환되어야 한다. 또한, 범위 바깥의 스케줄 바는 잘려야 한다.', () => {
    const schedule: Schedule = {
      id: 1,
      title: '내 일정',
      startDateTime: '2023-11-14 00:00',
      endDateTime: '2023-11-16 23:59',
    };

    const params = {
      ...defaultParams,
      schedule,
      relativeX: -349.9,
      relativeY: -150.1,
    };

    const expectedResult: ResultValue = {
      startDateTime: '2023-10-28 00:00',
      endDateTime: '2023-10-30 23:59',
      scheduleBars: [
        {
          scheduleId: 1,
          title: '내 일정',
          row: 0,
          column: 0,
          duration: 2,
          level: 0,
          roundedStart: false,
          roundedEnd: true,
          schedule: {
            id: 1,
            title: '내 일정',
            startDateTime: '2023-10-28 00:00',
            endDateTime: '2023-10-30 23:59',
          },
          calendarSize: 'md',
        },
      ],
    };

    const { startDateTime, endDateTime, scheduleBars } =
      generateScheduleBarsByMousePoint(params);

    expect({
      startDateTime,
      endDateTime,
      scheduleBars: removeIdFromScheduleBars(scheduleBars),
    }).toEqual(expectedResult);
  });

  test('상대 좌표가 우하단에 있을 경우, 그에 대응되는 날짜가 이동된 스케줄 바가 반환되어야 한다. 또한, 이동된 일정에 따라 적절하게 스케줄 바의 모양이 바뀌어야 한다.', () => {
    const schedule: Schedule = {
      id: 1,
      title: '빡구현좋아',
      startDateTime: '2023-11-14 14:00',
      endDateTime: '2023-11-20 16:30',
    };

    const params = {
      ...defaultParams,
      schedule,
      relativeX: 316,
      relativeY: 83,
    };

    const expectedResult: ResultValue = {
      startDateTime: '2023-11-24 14:00',
      endDateTime: '2023-11-30 16:30',
      scheduleBars: [
        {
          scheduleId: 1,
          title: '빡구현좋아',
          row: 3,
          column: 5,
          duration: 2,
          level: 0,
          roundedStart: true,
          roundedEnd: false,
          schedule: {
            id: 1,
            title: '빡구현좋아',
            startDateTime: '2023-11-24 14:00',
            endDateTime: '2023-11-30 16:30',
          },
          calendarSize: 'md',
        },
        {
          scheduleId: 1,
          title: '빡구현좋아',
          row: 4,
          column: 0,
          duration: 5,
          level: 0,
          roundedStart: false,
          roundedEnd: true,
          schedule: {
            id: 1,
            title: '빡구현좋아',
            startDateTime: '2023-11-24 14:00',
            endDateTime: '2023-11-30 16:30',
          },
          calendarSize: 'md',
        },
      ],
    };

    const { startDateTime, endDateTime, scheduleBars } =
      generateScheduleBarsByMousePoint(params);

    expect({
      startDateTime,
      endDateTime,
      scheduleBars: removeIdFromScheduleBars(scheduleBars),
    }).toEqual(expectedResult);
  });

  test('상대 좌표의 이동거리가 짧아 일정에 변화가 없는 경우, 변화되지 않은 스케줄 바 그대로를 반환해야 한다.', () => {
    const schedule: Schedule = {
      id: 1,
      title: '내 일정',
      startDateTime: '2023-11-14 00:00',
      endDateTime: '2023-11-16 23:59',
    };

    const params = {
      ...defaultParams,
      schedule,
      relativeX: 0,
      relativeY: 49.9999,
    };

    const expectedResult: ResultValue = {
      startDateTime: '2023-11-14 00:00',
      endDateTime: '2023-11-16 23:59',
      scheduleBars: [
        {
          scheduleId: 1,
          title: '내 일정',
          row: 2,
          column: 2,
          duration: 3,
          level: 0,
          roundedStart: true,
          roundedEnd: true,
          schedule: {
            id: 1,
            title: '내 일정',
            startDateTime: '2023-11-14 00:00',
            endDateTime: '2023-11-16 23:59',
          },
          calendarSize: 'md',
        },
      ],
    };

    const { startDateTime, endDateTime, scheduleBars } =
      generateScheduleBarsByMousePoint(params);

    expect({
      startDateTime,
      endDateTime,
      scheduleBars: removeIdFromScheduleBars(scheduleBars),
    }).toEqual(expectedResult);
  });
});

describe('Test #2 - 캘린더 크기 대응 테스트', () => {
  test('캘린더의 크기가 평소와 달라진 경우, 상대 좌표도 다르게 계산하여 반영하여야 한다.', () => {
    const schedule: Schedule = {
      id: 1,
      title: '내 일정',
      startDateTime: '2023-11-14 00:00',
      endDateTime: '2023-11-16 23:59',
    };

    const params = {
      ...defaultParams,
      schedule,
      calendarWidth: 732,
      calendarHeight: 481,
      relativeX: 156.8571,
      relativeY: -160.3334,
    };

    const expectedResult: ResultValue = {
      startDateTime: '2023-11-01 00:00',
      endDateTime: '2023-11-03 23:59',
      scheduleBars: [
        {
          scheduleId: 1,
          title: '내 일정',
          row: 0,
          column: 3,
          duration: 3,
          level: 0,
          roundedStart: true,
          roundedEnd: true,
          schedule: {
            id: 1,
            title: '내 일정',
            startDateTime: '2023-11-01 00:00',
            endDateTime: '2023-11-03 23:59',
          },
          calendarSize: 'md',
        },
      ],
    };

    const { startDateTime, endDateTime, scheduleBars } =
      generateScheduleBarsByMousePoint(params);

    expect({
      startDateTime,
      endDateTime,
      scheduleBars: removeIdFromScheduleBars(scheduleBars),
    }).toEqual(expectedResult);
  });
});

describe('Test #3 - 부가 기능 테스트', () => {
  test('캘린더 바의 사이즈, 레벨을 별도로 지정한 후 해당 설정으로 반영된 스케줄 바가 반환되어야 한다.', () => {
    const schedule: Schedule = {
      id: 1,
      title: '내 일정',
      startDateTime: '2023-11-14 00:00',
      endDateTime: '2023-11-16 23:59',
    };

    const params = {
      ...defaultParams,
      schedule,
      relativeX: 23,
      relativeY: 81,
      calendarSize: 'sm' as const,
      level: 2,
    };

    const expectedResult: ResultValue = {
      startDateTime: '2023-11-21 00:00',
      endDateTime: '2023-11-23 23:59',
      scheduleBars: [
        {
          scheduleId: 1,
          title: '내 일정',
          row: 3,
          column: 2,
          duration: 3,
          level: 2,
          roundedStart: true,
          roundedEnd: true,
          schedule: {
            id: 1,
            title: '내 일정',
            startDateTime: '2023-11-21 00:00',
            endDateTime: '2023-11-23 23:59',
          },
          calendarSize: 'sm',
        },
      ],
    };

    const { startDateTime, endDateTime, scheduleBars } =
      generateScheduleBarsByMousePoint(params);

    expect({
      startDateTime,
      endDateTime,
      scheduleBars: removeIdFromScheduleBars(scheduleBars),
    }).toEqual(expectedResult);
  });
});
