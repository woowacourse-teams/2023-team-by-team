import { styled, css } from 'styled-components';
import type { CSSProp } from 'styled-components';
import type { ButtonVariant, ButtonProps } from './Button';
import type { ButtonSize } from '~/types/size';

const paddingSize: Record<ButtonSize, string> = {
  sm: '6px',
  md: '12px',
  lg: '18px',
};

const variants: Record<ButtonVariant, CSSProp> = {
  primary: css`
    background-color: ${({ theme }) => theme.color.PRIMARY};
    color: ${({ theme }) => theme.color.WHITE};
  `,

  normal: css`
    background-color: ${({ theme }) => theme.color.WHITE};
    color: ${({ theme }) => theme.color.GRAY600};
    border: 1px solid ${({ theme }) => theme.color.GRAY600};
  `,
};

export const Button = styled.button<ButtonProps>`
  border-radius: 4px;

  font-size: 16px;
  line-height: 16px;
  text-align: center;

  transition: 0.2s;

  ${({ size = 'md' }) => css`
    padding: ${paddingSize[size]};
  `};

  ${({ variant = 'primary' }) => variants[variant]};

  &:disabled {
    opacity: 0.6;
  }

  &:not([disabled]):hover {
    opacity: 0.8;
  }

  ${(props) => props.css}
`;
