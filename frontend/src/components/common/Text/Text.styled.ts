import { styled, css } from 'styled-components';
import type { CSSProp } from 'styled-components';
import type { Size } from '~/types/size';
import type { TextProps, Weight } from './Text';

const FontWeight: Record<Weight, CSSProp> = {
  light: css`
    font-weight: 100;
  `,
  normal: css`
    font-weight: 400;
  `,
  bold: css`
    font-weight: 800;
  `,
};

const FontSize: Record<Size, CSSProp> = {
  xxs: css`
    font-size: 12px;
  `,
  xs: css`
    font-size: 16px;
  `,
  sm: css`
    font-size: 20px;
  `,
  md: css`
    font-size: 24px;
  `,
  lg: css`
    font-size: 30px;
  `,
  xl: css`
    font-size: 36px;
  `,
  xxl: css`
    font-size: 40px;
  `,
};

export const Text = styled.p<TextProps>`
  ${({ size = 'md' }) => FontSize[size]}
  ${({ weight = 'normal' }) => FontWeight[weight]}
  ${(props) => props.css}
`;
