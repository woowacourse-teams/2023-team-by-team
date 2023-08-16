import * as S from './Input.styled';
import type { CSSProp } from 'styled-components';
import type { ComponentPropsWithRef } from 'react';
import { forwardRef } from 'react';

export interface InputProps extends ComponentPropsWithRef<'input'> {
  width: string;
  height: string;
  css?: CSSProp;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { width, height, css, ...rest } = props;

  return (
    <S.InputWrapper
      width={width}
      height={height}
      css={css}
      ref={ref}
      {...rest}
    ></S.InputWrapper>
  );
});

Input.displayName = 'Input';

export default Input;
