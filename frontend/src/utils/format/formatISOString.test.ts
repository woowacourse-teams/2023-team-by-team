import { formatISOString } from '~/utils/format/formatISOString';

describe('formatISOString', () => {
  it('YYYY-MM-DDTHH:MM 형식의 ISO string을 YYYY-MM-DD HH:MM 형식으로 변환한다.', () => {
    const rawISOString = '2023-07-24T00:00';
    const result = formatISOString(rawISOString);

    expect(result).toBe('2023-07-24 00:00');
  });
});
