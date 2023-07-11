import * as S from './Button.styled';
import type { PropsWithChildren, ButtonHTMLAttributes } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'normal';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  type?: ButtonType;
  variant?: ButtonVariant;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { children } = props;

  return <S.Button {...props}>{children}</S.Button>;
};

export default Button;
