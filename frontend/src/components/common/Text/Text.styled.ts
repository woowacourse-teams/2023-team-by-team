import { styled } from 'styled-components';
import type { TextSize } from '~/types/size';
import type { TextProps, Weight } from './Text';

const fontWeight: Record<Weight, number> = {
  light: 100,
  normal: 400,
  bold: 800,
};

const fontSize: Record<TextSize, string> = {
  xxs: '10px',
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '22px',
};

export const Text = styled.p<TextProps>`
  h1&,
  h2&,
  h3&,
  h4&,
  h5&,
  h6& {
    font-weight: bold;
  }
  h1& {
    font-size: 36px;
  }
  h2& {
    font-size: 32px;
  }
  h3& {
    font-size: 28px;
  }
  h4& {
    font-size: 24px;
  }
  p&,
  span&,
  strong&,
  small& {
    font-size: ${({ size = 'md' }) => fontSize[size] || 'initial'};
    font-weight: ${({ weight = 'normal' }) => fontWeight[weight] || 'initial'};
  }
  && {
    ${(props) => props.css}
  }
`;
