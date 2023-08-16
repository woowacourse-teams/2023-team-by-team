import type { YYYYMMDDHHMM } from '~/types/schedule';
import { formatDateTime } from '~/utils/formatDateTime';

describe('formatDateTime', () => {
  it('YYYY-MM-DD HH:MM 형식의 Date을 YYYY년 MM월 DD일 HH:MM 형식으로 변환한다.', () => {
    const rawDateTime: YYYYMMDDHHMM = '2023-07-24 00:00';
    const result = formatDateTime(rawDateTime);

    expect(result).toBe('2023년 07월 24일 00:00');
  });
});
