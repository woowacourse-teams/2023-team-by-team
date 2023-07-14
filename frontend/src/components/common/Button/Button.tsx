import type { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import type { CSSProp } from 'styled-components';
import type { ButtonSize } from '~/types/size';
import * as S from './Button.styled';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'normal' | 'plain';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  type?: ButtonType;
  variant?: ButtonVariant;
  css?: CSSProp;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { children, size, type = 'submit', variant, ...rest } = props;

  return (
    <S.Button type={type} size={size} variant={variant} {...rest}>
      {children}
    </S.Button>
  );
};

export default Button;
