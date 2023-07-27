import type { YYYYMMDDHHMM } from '~/types/schedule';
import { formatWriteTime } from '~/utils/formatWriteTime';

describe('formatWriteTime', () => {
  it('YYYY-MM-DD HH:MM 형식의 Date을 YYYY-MM-DD HH:MM 형식으로 변환한다.', () => {
    const rawDate: YYYYMMDDHHMM = '2023-07-24 00:00';
    const result = formatWriteTime(rawDate);

    expect(result).toBe('2023/07/24 00:00');
  });
});
