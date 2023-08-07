import type { YYYYMMDDHHMM } from '~/types/schedule';
import { formatTime } from '~/utils/format/formatTime';

describe('formatTime', () => {
  it('하루 일정이 들어올 경우 시작 시간과 끝 시간만 반환한다.', () => {
    const currentDateTime: YYYYMMDDHHMM = '2023-08-01 00:00';
    const startDateTime: YYYYMMDDHHMM = '2023-08-01 15:00';
    const endDateTime: YYYYMMDDHHMM = '2023-08-01 17:00';

    const result = formatTime(currentDateTime, startDateTime, endDateTime);

    expect(result).toEqual('15:00 ~ 17:00');
  });

  it('종일 일정이 들어올 경우 (종일)을 반환한다.', () => {
    const currentDateTime: YYYYMMDDHHMM = '2023-08-01 00:00';
    const startDateTime: YYYYMMDDHHMM = '2023-08-01 00:00';
    const endDateTime: YYYYMMDDHHMM = '2023-08-01 23:59';

    const result = formatTime(currentDateTime, startDateTime, endDateTime);

    expect(result).toEqual('종일');
  });

  it('여러 날에 걸치는 일정에서 선택한 날짜와 시작 날짜가 같으면 (시작시간 ~ 00:00)을 반환한다.', () => {
    const currentDateTime: YYYYMMDDHHMM = '2023-08-01 00:00';
    const startDateTime: YYYYMMDDHHMM = '2023-08-01 15:00';
    const endDateTime: YYYYMMDDHHMM = '2023-08-03 17:00';

    const result = formatTime(currentDateTime, startDateTime, endDateTime);

    expect(result).toEqual('15:00 ~ 00:00');
  });

  it('여러 날에 걸치는 일정에서 선택한 날짜가 시작,끝 날짜가 아니라면 (종일)을 반환한다.', () => {
    const currentDateTime: YYYYMMDDHHMM = '2023-08-02 00:00';
    const startDateTime: YYYYMMDDHHMM = '2023-08-01 15:00';
    const endDateTime: YYYYMMDDHHMM = '2023-08-03 17:00';

    const result = formatTime(currentDateTime, startDateTime, endDateTime);

    expect(result).toEqual('종일');
  });

  it('여러 날에 걸치는 일정에서 선택한 날짜와 끝 날짜가 같으면 (00:00 ~ 끝 시간)을 반환한다.', () => {
    const currentDateTime: YYYYMMDDHHMM = '2023-08-03 00:00';
    const startDateTime: YYYYMMDDHHMM = '2023-08-01 15:00';
    const endDateTime: YYYYMMDDHHMM = '2023-08-03 17:00';

    const result = formatTime(currentDateTime, startDateTime, endDateTime);

    expect(result).toEqual('00:00 ~ 17:00');
  });
});
