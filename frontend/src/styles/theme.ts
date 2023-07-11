const color = {
  WHITE: '#fff',
  BLACK: '#000',

  GRAY100: '#f2f4f6',
  GRAY200: '#e5e8eb',
  GRAY300: '#d1d6db',
  GRAY400: '#b0b8c1',
  GRAY500: '#8b95a1',
  GRAY600: '#6b7684',
  GRAY700: '#4e5968',
  GRAY800: '#333d4b',
  GRAY900: '#191f28',

  PRIMARY: '#3145ff',
} as const;

export const theme = {
  color,
} as const;

export type Theme = typeof theme;

export default theme;
