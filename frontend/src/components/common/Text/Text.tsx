import { PropsWithChildren } from 'react';
import type { Size, Weight } from '~/types/size';
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
