import { getDateByPosition } from './getDateByPosition';

describe('날짜 객체 반환 테스트', () => {
  test.each([
    [2023, 6, 0, 0, new Date(2023, 5, 25)],
    [2023, 6, 0, 1, new Date(2023, 5, 26)],
    [2023, 6, 0, 4, new Date(2023, 5, 29)],
    [2023, 6, 0, 6, new Date(2023, 6, 1)],
    [2023, 6, 1, 1, new Date(2023, 6, 3)],
    [2023, 6, 2, 3, new Date(2023, 6, 12)],
    [2023, 6, 3, 4, new Date(2023, 6, 20)],
    [2023, 6, 4, 0, new Date(2023, 6, 23)],
    [2023, 6, 4, 5, new Date(2023, 6, 28)],
    [2023, 6, 5, 5, new Date(2023, 7, 4)],
    [2023, 6, 5, 6, new Date(2023, 7, 5)],
    [2023, 5, 0, 0, new Date(2023, 4, 28)],
    [2023, 9, 5, 6, new Date(2023, 10, 11)],
    [2022, 11, 3, 3, new Date(2022, 11, 21)],
  ])(
    'year = %s, month = %s, row = %s, column = %s -> %s 가 반환되어야 한다.',
    (year, month, row, column, expectedDate) => {
      expect(getDateByPosition(year, month, row, column)).toEqual(expectedDate);
    },
  );
});

describe('예외 처리 테스트', () => {
  test.each([
    [2023, 6, -1, 0],
    [2021, 9, 6, 6],
    [2023, 4, 10, 23],
    [2022, 11, 4, 7],
  ])(
    'year = %s, month = %s, row = %s, column = %s -> 에러가 발생해야 한다.',
    (year, month, row, column) => {
      expect(() => getDateByPosition(year, month, row, column)).toThrow();
    },
  );
});
