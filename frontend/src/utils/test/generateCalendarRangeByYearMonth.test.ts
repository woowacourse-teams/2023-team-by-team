import { generateCalendarRangeByYearMonth } from '~/utils/generateCalendarRangeByYearMonth';
describe('캘린더 범위 생성 테스트', () => {
  it.each([
    [2023, 0, { startDate: '20230101', endDate: '20230211' }],
    [2023, 1, { startDate: '20230129', endDate: '20230311' }],
    [2023, 4, { startDate: '20230430', endDate: '20230610' }],
    [2023, 6, { startDate: '20230625', endDate: '20230805' }],
    [2023, 11, { startDate: '20231126', endDate: '20240106' }],
    [2018, 8, { startDate: '20180826', endDate: '20181006' }],
    [2025, 3, { startDate: '20250330', endDate: '20250510' }],
  ])(
    '%s년 %s월 달력(월은 0-based)의 경우 결괏값은 %s 여야 한다.',
    (year, month, expected) => {
      expect(generateCalendarRangeByYearMonth(year, month)).toEqual(expected);
    },
  );
});
