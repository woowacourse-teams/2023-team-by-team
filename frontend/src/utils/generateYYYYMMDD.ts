import type { YYYYMMDD } from '~/types/schedule';

export const generateYYYYMMDD = (date: Date): YYYYMMDD => {
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
