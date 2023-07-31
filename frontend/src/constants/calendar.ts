import { arrayOf } from '~/utils/arrayOf';

export const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const ONE_DAY = 86_400_000;

export const CALENDAR = {
  ROW_SIZE: 6,
  COLUMN_SIZE: 7,
} as const;

export const TIME_TABLE = arrayOf(48).map((_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  const isAM = hour < 12;

  return `${isAM ? '오전' : '오후'} ${hour % 12 || 12}:${minute}`;
});

export const MODAL_OPEN_TYPE = {
  ADD: 'add',
  VIEW: 'view',
  EDIT: 'edit',
  DAILY: 'daily',
} as const;
