import { keyframes } from 'styled-components';

const color = {
  LOGO: '#3145FF',
  PRIMARY: '#516FFF',
  WHITE: '#fff',
  BLACK: '#000',
  RED: '#FF5B5B',
  PURPLE: '#6E61ff',

  NAVY: '#303650',

  GRAY100: '#f2f4f6',
  GRAY200: '#e5e8eb',
  GRAY300: '#d1d6db',
  GRAY400: '#b0b8c1',
  GRAY500: '#8b95a1',
  GRAY600: '#6b7684',
  GRAY700: '#4e5968',
  GRAY800: '#333d4b',
  GRAY900: '#191f28',
} as const;

const zIndex = {
  MODAL: 1,
} as const;

const animation = {
  slideUp: keyframes`
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  `,
  slideDown: keyframes`
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }  
  `,
};

export const theme = {
  color,
  zIndex,
  animation,
} as const;

export type Theme = typeof theme;

export default theme;
