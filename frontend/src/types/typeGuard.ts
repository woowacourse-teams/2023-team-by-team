import type { YYYYMMDDHHMM } from '~/types/schedule';

export const isYYYYMMDDHHMM = (value: string): value is YYYYMMDDHHMM => {
  return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value);
};
