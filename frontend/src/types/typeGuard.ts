import type { YYYYMMDDHHMM, YYYYMMDD } from '~/types/schedule';

export const isYYYYMMDDHHMM = (value: unknown): value is YYYYMMDDHHMM => {
  if (typeof value !== 'string') {
    return false;
  }

  return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value);
};

export const isYYYYMMDD = (value: unknown): value is YYYYMMDD => {
  if (typeof value !== 'string') {
    return false;
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(value);
};
