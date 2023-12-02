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
    color: ${({ theme }) => theme.color.GRAY900};
    border: 1px solid ${({ theme }) => theme.color.GRAY300};
  `,

  plain: css`
    background-color: transparent;
    color: ${({ theme }) => theme.color.GRAY900};
  `,
};

export const ButtonWrapper = styled.button.withConfig({
  shouldForwardProp: (prop) => !['css', 'variant', 'size'].includes(prop),
})<ButtonProps>`
  font-size: 16px;
  line-height: 16px;
  text-align: center;

  ${({ size = 'md' }) => {
    return css`
      padding: ${paddingSize[size]};
    `;
  }};

  ${({ variant = 'primary' }) => {
    return variants[variant];
  }};

  ${({ variant = 'primary' }) => {
    if (variant !== 'plain') {
      return css`
        &:disabled {
          opacity: 0.6;
        }

        &:not([disabled]):hover {
          opacity: 0.8;
        }

        border-radius: 4px;

        transition: 0.2s;
      `;
    }
  }};

  ${(props) => props.css}
`;
