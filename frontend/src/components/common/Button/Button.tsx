import * as S from './Button.styled';
import type { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import type { CSSProp } from 'styled-components';
import type { ButtonSize } from '~/types/size';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'normal';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  type?: ButtonType;
  variant?: ButtonVariant;
  css?: CSSProp;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { children, size, type = 'submit', variant, ...rest } = props;

  return (
    <S.Button type={type} {...rest}>
      {children}
    </S.Button>
  );
};

export default Button;
