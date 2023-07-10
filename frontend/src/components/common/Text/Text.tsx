import { PropsWithChildren } from 'react';
import type { CSSProp } from 'styled-components';
import type { Size, Weight } from '~/types/size';
import * as S from './Text.styled';

interface TextProps extends PropsWithChildren {
  size?: Size;
  weight?: Weight;
  css?: CSSProp;
}

const Text = (props: TextProps) => {
  const { size, weight, css, children } = props;

  return (
    <S.Text size={size} css={css} weight={weight}>
      {children}
    </S.Text>
  );
};

export default Text;
