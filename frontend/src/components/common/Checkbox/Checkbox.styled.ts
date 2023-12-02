import { styled, css } from 'styled-components';
import type { CheckboxSize } from '~/types/size';
import type { CheckboxProps } from './Checkbox';
import type { CSSProp } from 'styled-components';

type CustomCheckboxProps = Pick<CheckboxProps, 'color' | 'css' | 'size'>;

type CheckIconWrapperProps = Pick<CheckboxProps, 'size'>;

const checkboxSizes: Record<CheckboxSize, CSSProp> = {
  sm: css`
    width: 20px;
    height: 20px;
    border-radius: 2px;
  `,

  md: css`
    width: 26px;
    height: 26px;
    border-radius: 3px;
  `,

  lg: css`
    width: 32px;
    height: 32px;
    border-radius: 4px;
  `,

  xl: css`
    width: 38px;
    height: 38px;
    border-radius: 5px;
  `,
};

const checkIconSizes: Record<CheckboxSize, CSSProp> = {
  sm: css`
    width: 14px;
    height: 14px;
  `,

  md: css`
    width: 20px;
    height: 20px;
  `,

  lg: css`
    width: 26px;
    height: 26px;
  `,

  xl: css`
    width: 32px;
    height: 32px;
  `,
};

export const RealCheckbox = styled.input`
  appearance: none;
`;

export const CustomCheckbox = styled.span.withConfig({
  shouldForwardProp: (prop) => !['size'].includes(prop),
})<CustomCheckboxProps>`
  display: inline-block;

  ${({ size = 'md' }) => checkboxSizes[size]}

  border: 3px solid
    ${({ color, theme }) => {
    if (color) {
      return color;
    }

    return theme.color.PRIMARY;
  }};
  background: transparent;

  transition: 0.2s;
  cursor: pointer;

  ${RealCheckbox}:checked ~ & {
    background-color: ${({ color, theme }) => {
      if (color) {
        return color;
      }

      return theme.color.PRIMARY;
    }};
  }

  ${RealCheckbox} ~ & svg {
    opacity: 0;
    transition: 0.2s;
  }

  ${RealCheckbox}:checked ~ & svg {
    opacity: 1;
  }

  ${({ css }) => css};
`;

export const CheckIconWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size'].includes(prop),
})<CheckIconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  & svg {
    ${({ size = 'md' }) => checkIconSizes[size]}
  }
`;
