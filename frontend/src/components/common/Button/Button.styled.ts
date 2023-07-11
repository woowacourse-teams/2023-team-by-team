import { styled, css } from 'styled-components';
import type { CSSProp } from 'styled-components';
import type { ButtonVariant, ButtonProps } from './Button';
import type { ButtonSize } from '~/types/size';

const colors = {
  primaryBlue: '#3145ff',
  gray: '#666',
  white: '#fff',
const paddingSize: Record<ButtonSize, string> = {
  sm: '6px',
  md: '12px',
  lg: '18px',
};

const paddingStyles = {
  small: '6px',
  medium: '12px',
  large: '18px',
};

const variantStyles: Record<ButtonVariant, CSSProp> = {
  primary: css`
    background-color: ${colors.primaryBlue};
    color: ${colors.white};
  `,

  normal: css`
    background-color: ${colors.white};
    color: ${colors.gray};
    border: 1px solid ${colors.gray};
  `,
};

export const Button = styled.button<ButtonProps>`
  border-radius: 4px;

  font-size: 16px;
  line-height: 16px;
  text-align: center;

  transition: 0.2s;

  ${({ size = 'medium' }) => css`
    padding: ${paddingStyles[size]};
  `};

  ${({ variant = 'primary' }) => variantStyles[variant]};

  &:disabled {
    opacity: 0.6;
  }

  &:not([disabled]):hover {
    opacity: 0.8;
  }
`;
