import type { YYYYMMDDHHMM } from '~/types/schedule';

export const formatDateTime = (rawDateTime: YYYYMMDDHHMM) => {
  const [rawDate, time] = rawDateTime.split(' ');
  const date = rawDate.split('-');

  return `${date[0]}년 ${date[1]}월 ${date[2]}일 ${time}`;
};
