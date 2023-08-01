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

const teamColor = {
  0: '#4886FF',
  1: '#59DFC7',
  2: '#8E1DFF',
  3: '#FF6666',
  4: '#FF66F9',
  5: '#FF9051',
  6: '#FFC451',
  7: '#FF51B9',
  8: '#51C0FF',
  9: '#82FF48',
};

const zIndex = {
  MODAL: 1,
  MENU: 2,
} as const;

const teamColor = {
  0: '#4886FF',
  1: '#59DFC7',
  2: '#8E1DFF',
  3: '#FF6666',
  4: '#FF66F9',
  5: '#FF9051',
  6: '#FFC451',
  7: '#FF51B9',
  8: '#51C0FF',
  9: '#82FF48',
};
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
  duration: 400,
};

export const theme = {
  color,
  teamColor,
  zIndex,
  animation,
  teamColor,
} as const;

export type Theme = typeof theme;

export default theme;
