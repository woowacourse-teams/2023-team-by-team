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
  GRAY350: '#c9c9c9',
  GRAY400: '#b0b8c1',
  GRAY500: '#8b95a1',
  GRAY600: '#6b7684',
  GRAY700: '#4e5968',
  GRAY800: '#333d4b',
  GRAY900: '#191f28',

  BLUE100: '#d1ddff',
  BLUE200: '#b9cbff',
  BLUE300: '#a0c1fd',
  BLUE400: '#8ba9ff',
  BLUE500: '#5885f5',
  BLUE600: '#2459e0',
  BLUE700: '#193ecb',

  TRANSPARENT_BLACK: '#777777aa',
} as const;

const teamColor = {
  0: '#4886FF',
  1: '#FF66F9',
  2: '#FF6666',
  3: '#8E1DFF',
  4: '#707070',
  5: '#003E86',
  6: '#B900B2',
  7: '#9D1C1C',
  8: '#46008C',
  9: '#4C4C4C',
  100: '#fff',
} as const;

const gradient = {
  SMOOTH_BLACK: 'linear-gradient(45deg, #121212, #303030)',
};

const zIndex = {
  LANDING_CARD: -1,
  MODAL: 1,
  MENU: 2,
  TOAST: 3,
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
  slideLeft: keyframes`
    from {
      transform: translateX(140%);
    }
    to {
      transform: translateX(0);
    }  
  `,
  slideRight: keyframes`
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(140%);
    }  
  `,
  fadeInUp: keyframes`
    from {
      opacity: 0;
      transform: translate3D(0, 100%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  `,
  fadeOut: keyframes`
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  `,
  duration: 400,
};

export const theme = {
  color,
  teamColor,
  gradient,
  zIndex,
  animation,
} as const;

export type Theme = typeof theme;

export default theme;
