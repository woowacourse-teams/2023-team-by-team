import { formatISOString } from '~/utils/formatISOString';

describe('formatISOString', () => {
  it('YYYY-MM-DDTHH:MM 형식의 ISO string을 YYYY-MM-DD HH:MM 형식으로 변환한다.', () => {
    const rawISOString = '2021-07-13T00:00';
    const result = formatISOString(rawISOString);

    expect(result).toBe('2021-07-13 00:00');
  });
});
