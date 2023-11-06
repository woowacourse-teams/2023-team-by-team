import { keyframes } from 'styled-components';

const color = {
  LOGO: '#3145ff',
  PRIMARY: '#516Fff',
  PRIMARY200: '#b7baff',
  PRIMARY900: '#5054ff',
  WHITE: '#fff',
  WHITE_BLUR: '#ffffffad',
  BLACK: '#000',
  RED: '#ff5b5b',
  PURPLE: '#6e61ff',

  NAVY: '#303650',

  GRAY100: '#f2f4f6',
  GRAY150: '#eaeaea',
  GRAY200: '#e5e8eb',
  GRAY300: '#d1d6db',
  GRAY350: '#c9c9c9',
  GRAY400: '#b0b8c1',
  GRAY500: '#8b95a1',
  GRAY550: '#848484',
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

  PURPLE100: '#b7baff',
  PURPLE400: '#8e92ff',

  TRANSPARENT_BLACK: '#777777aa',
} as const;

const teamColor = {
  0: '#4886ff',
  1: '#ff66F9',
  2: '#ff6666',
  3: '#8e1dff',
  4: '#707070',
  5: '#003e86',
  6: '#b900b2',
  7: '#9d1c1c',
  8: '#46008c',
  9: '#4c4c4c',
  100: '#fff',
} as const;

const gradient = {
  SMOOTH_BLACK: 'linear-gradient(45deg, #797979aa, #a0a0a0aa)',
  WHITE: (pixels: `${number}px`) =>
    `linear-gradient(to top, #eaeaea 0%, #eaeaea ${pixels}, transparent 100%)`,
  BLURPLE: (pixels: `${number}px`) =>
    `linear-gradient(to top, #5054ff 0%, #5054ff ${pixels}, transparent 100%)`,
};

const zIndex = {
  LANDING_CARD: -1,
  NOTICE: 1,
  MODAL: 2,
  MENU: 3,
  TOAST: 4,
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
  loading: keyframes`
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
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
