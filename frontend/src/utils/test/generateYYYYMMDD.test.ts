import { generateYYYYMMDD } from '~/utils/generateYYYYMMDD';

describe('YYYYMMDD 포맷 생성 테스트', () => {
  it.each([
    [new Date('2023-12-19'), '20231219'],
    [new Date('0072-01-06'), '00720106'],
    [new Date('1972-11-21 04:58'), '19721121'],
    [new Date('1972-11-21 23:59'), '19721121'],
    [new Date('2023-06-13'), '20230613'],
    [new Date('2013-12-01'), '20131201'],
    [new Date('2020-02-29'), '20200229'],
    [new Date('2000-02-29'), '20000229'],
    [new Date('1964-12-31'), '19641231'],
  ])(
    '%s 정보를 지니는 Date 객체에 대해 %s 값이 반환되어야 한다.',
    (date, expected) => {
      expect(generateYYYYMMDD(date)).toBe(expected);
    },
  );
});
