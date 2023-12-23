import { generateDateTimeRangeDescription } from '../generateDateTimeRangeDescription';

describe('Test #1 - 동일한 일정 테스트', () => {
  it('시작 일정과 끝 일정이 완전히 동일할 경우 시작 일정만을 반환해야 한다.', () => {
    const startDateTime = '2023-10-21 03:00';
    const endDateTime = '2023-10-21 03:00';
    const expected = '2023년 10월 21일 03:00';

    expect(generateDateTimeRangeDescription(startDateTime, endDateTime)).toBe(
      expected,
    );
  });
});

describe('Test #2 - 종일 일정 테스트', () => {
  it('하루짜리 종일 일정일 경우, 시간 표시 없이 일정만을 표시해야 한다..', () => {
    const startDateTime = '1972-11-21 00:00';
    const endDateTime = '1972-11-21 23:59';
    const expected = '1972년 11월 21일';

    expect(generateDateTimeRangeDescription(startDateTime, endDateTime)).toBe(
      expected,
    );
  });

  it('여러 날에 걸친 종일 일정일 경우, 시작 일정과 끝 일정을 표시하되 시간은 생략해야 한다.', () => {
    const startDateTime = '1972-11-21 00:00';
    const endDateTime = '1972-11-24 23:59';
    const expected = '1972년 11월 21일 ~ 1972년 11월 24일';

    expect(generateDateTimeRangeDescription(startDateTime, endDateTime)).toBe(
      expected,
    );
  });
});

describe('Test #3 - 일반 일정 테스트', () => {
  it('위 테스트에 속하는 일정이 아닌 평범한 일정일 경우, 시작 일정과 끝 일정을 시간을 포함하여 모두 표시하여야 한다.', () => {
    const startDateTime = '2023-10-21 03:00';
    const endDateTime = '2023-10-27 18:30';
    const expected = '2023년 10월 21일 03:00 ~ 2023년 10월 27일 18:30';

    expect(generateDateTimeRangeDescription(startDateTime, endDateTime)).toBe(
      expected,
    );
  });
});
