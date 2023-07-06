const color = {
  WHITE: '#fff',
  BLACK: '#333',
} as const;

const fontSize = {
  X_SMALL: '12px',
  SMALL: '14px',
  MEDIUM: '16px',
  LARGE: '18px',
  X_LARGE: '20px',
} as const;

export const theme = {
  color,
  fontSize,
} as const;

export type Theme = typeof theme;

export default theme;
