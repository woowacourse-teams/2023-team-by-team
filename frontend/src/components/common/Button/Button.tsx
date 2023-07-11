import * as S from './Button.styled';
import type { ButtonProps } from './ButtonProps';

const Button = (props: ButtonProps) => {
  const { children } = props;

  return <S.Button {...props}>{children}</S.Button>;
};

export default Button;
