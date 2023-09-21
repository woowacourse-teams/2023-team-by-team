import styled from 'styled-components';
import type { SkeletonProps } from '~/components/common/Skeleton/Skeleton';

export const Wrapper = styled.div<SkeletonProps>`
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.03);
  border-radius: ${({ variant }) => (variant === 'circle' ? '50%' : '4px')};

  ${({ css }) => css}

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.06),
      transparent
    );

    animation: ${({ theme }) => theme.animation.loading} 1.5s linear 0.5s
      infinite;

    content: '';
  }
`;
