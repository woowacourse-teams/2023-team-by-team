import { styled, css, CSSProp } from 'styled-components';
import type { ButtonProps, ButtonVariant } from './ButtonProps';

const colors = {
  primaryBlue: '#3145ff',
  gray: '#666',
  white: '#fff',
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

export const Button = styled.p<ButtonProps>`
  display: inline-block;

  border-radius: 3px;

  font-size: 16px;
  line-height: 16px;
  text-align: center;

  cursor: pointer;
  transition: 0.2s;

  ${({ size }) => css`
    padding: ${paddingStyles[size]};
  `};

  ${({ variant = 'primary' }) => variantStyles[variant]};

  ${({ disabled = false }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `};

  &:not([disabled]):hover {
    opacity: 0.8;
  }
`;
