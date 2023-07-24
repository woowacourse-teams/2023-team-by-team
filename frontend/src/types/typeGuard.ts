import type { YYYYMMDDHHMM } from '~/types/schedule';

export const isYYYYMMDDHHMM = (
  dateString: string,
): dateString is YYYYMMDDHHMM => {
  return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateString);
};
