import { arrayOf } from '~/utils/arrayOf';

export const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const ONE_DAY = 86_400_000;

export const CALENDAR = {
  ROW_SIZE: 6,
  COLUMN_SIZE: 7,
} as const;

export const TIME_TABLE = arrayOf(48).map((_, i) => {
  const hour = String(Math.floor(i / 2)).padStart(2, '0');
  const minute = i % 2 === 0 ? '00' : '30';

  return `${hour}:${minute}`;
});

export const SCHEDULE_CIRCLE_MAX_COUNT = 3;

export const MODAL_OPEN_TYPE = {
  ADD: 'add',
  VIEW: 'view',
  EDIT: 'edit',
  DAILY: 'daily',
  EXPORT: 'export',
} as const;
