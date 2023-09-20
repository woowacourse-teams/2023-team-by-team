import * as S from './Skeleton.styled';
import type { CSSProp } from 'styled-components';

export interface SkeletonProps {
  variant?: 'normal' | 'circle';
  css?: CSSProp;
}

const Skeleton = (props: SkeletonProps) => {
  const { variant = 'normal', css } = props;

  return <S.Wrapper variant={variant} css={css} />;
};

export default Skeleton;
