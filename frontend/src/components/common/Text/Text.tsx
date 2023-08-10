import type { PropsWithChildren } from 'react';
import type { CSSProp } from 'styled-components';
import type { Size } from '~/types/size';
import * as S from './Text.styled';

export type Weight = 'light' | 'normal' | 'semiBold' | 'bold';
export interface TextProps {
  as?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'strong'
    | 'small';
  size?: Size;
  weight?: Weight;
  css?: CSSProp;
}

const Text = (props: PropsWithChildren<TextProps>) => {
  const { as = 'p', size, weight, css, children } = props;

  return (
    <S.TextWrapper as={as} size={size} css={css} weight={weight}>
      {children}
    </S.TextWrapper>
  );
};

export default Text;
