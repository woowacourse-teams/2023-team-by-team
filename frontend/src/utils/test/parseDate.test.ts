import { parseDate } from '../parseDate';

describe('parseDate', () => {
  it('인자로 전달받은 Date객체를 년, 월, 일, 요일을 갖는 객체로 반환한다.', () => {
    const rawDate = new Date(2023, 6, 13);
    const result = parseDate(rawDate);

    expect(result).toEqual({ year: 2023, month: 6, date: 13, day: 4 });
  });
});
