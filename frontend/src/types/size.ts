export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ButtonSize = Extract<Size, 'sm' | 'md' | 'lg'>;

export type TextSize = Size;

export type SpinnerSize = Extract<Size, 'sm' | 'md' | 'lg'>;

export type DateCellSize = Extract<Size, 'sm' | 'md' | 'lg'>;

export type ThreadSize = Extract<Size, 'sm' | 'md'>;

export type NotificationSize = Extract<Size, 'sm' | 'md'>;

export type CheckboxSize = Extract<Size, 'sm' | 'md' | 'lg' | 'xl'>;

export type NoticeTagSize = Extract<Size, 'sm' | 'md'>;

export type NoticeSize = Extract<Size, 'sm' | 'md' | 'lg'>;

export type TeamBadgeSize = Extract<Size, 'sm' | 'md' | 'lg'>;

export type CalendarSize = Extract<Size, 'sm' | 'md'>;

export type LinkSize = Extract<Size, 'sm' | 'md'>;
