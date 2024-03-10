import type { YYYYMMDD } from '~/types/schedule';

export const formatDate = (rawDate: YYYYMMDD) => {
  const [year, month, day] = rawDate.split('-');

  return `${year}년 ${month}월 ${day}일`;
};
