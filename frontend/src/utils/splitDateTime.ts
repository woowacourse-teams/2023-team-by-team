import type { YYYYMMDDHHMM, YYYYMMDD } from '~/types/schedule';
import { isYYYYMMDD } from '~/types/typeGuard';

export const splitDateTime = (
  dateTime: YYYYMMDDHHMM,
): { date: YYYYMMDD; time: string } => {
  const [date, time] = dateTime.split(' ');

  if (!isYYYYMMDD(date)) {
    throw Error('잘못된 dateTime 변수가 대입되었습니다.');
  }

  return {
    date,
    time,
  };
};
