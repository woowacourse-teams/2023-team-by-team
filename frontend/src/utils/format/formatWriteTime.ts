import type { YYYYMMDDHHMM } from '~/types/schedule';

export const formatWriteTime = (rawDateTime: YYYYMMDDHHMM) => {
  return rawDateTime.replaceAll('-', '/');
};
