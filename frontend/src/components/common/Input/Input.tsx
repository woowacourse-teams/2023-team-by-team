import * as S from './Input.styled';
import type { CSSProp } from 'styled-components';
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width: string;
  height: string;
  css?: CSSProp;
}

const Input = (props: InputProps) => {
  const { width, height, css, ...rest } = props;

  return (
    <S.InputWrapper
      width={width}
      height={height}
      css={css}
      {...rest}
    ></S.InputWrapper>
  );
};

export default Input;
