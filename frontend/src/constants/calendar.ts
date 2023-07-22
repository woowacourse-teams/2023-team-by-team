export const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const ONE_DAY = 86_400_000;

export const CALENDAR = {
  ROW_SIZE: 6,
  COLUMN_SIZE: 7,
} as const;

export const MODAL_OPEN_TYPE = {
  ADD: 'add',
  VIEW: 'view',
  EDIT: 'edit',
  ONE_DAY: 'oneDay',
} as const;
