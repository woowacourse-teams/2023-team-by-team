export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ButtonSize = Extract<Size, 'sm' | 'md' | 'lg'>;

export type TextSize = Size;

export type DateCellSize = Extract<Size, 'sm' | 'md' | 'lg'>;

export type ThreadSize = Extract<Size, 'sm' | 'md'>;

export type NotificationSize = Extract<Size, 'sm' | 'md'>;

