import { styled, css, keyframes } from 'styled-components';
import type { CSSProp } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;

  width: 1100px;
  height: 910px;

  transform-origin: bottom left;
`;

const cardRotateAnimation = (afterDegree: string) => keyframes`
  0% {
    transform: rotate(-60deg);
  }
  100% {
    transform: rotate(${afterDegree});
  }
`;

export const Card = styled.div<{ css: CSSProp }>`
  position: absolute;
  right: 60%;
  bottom: -30%;

  width: 640px;
  height: 910px;

  box-shadow: 0 20px 40px ${({ theme }) => theme.color.TRANSPARENT_BLACK};

  transform-origin: bottom right;
  transform: rotate(-60deg);

  ${({ css }) => css}
`;

export const card1 = css`
  background-color: ${({ theme }) => theme.color.BLUE300};

  animation: ${() => cardRotateAnimation('10deg')} 1.5s;
  animation-fill-mode: forwards;
`;

export const card2 = css`
  background-color: ${({ theme }) => theme.color.BLUE200};

  animation: ${() => cardRotateAnimation('17deg')} 1.5s;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
`;

export const card3 = css`
  background-color: ${({ theme }) => theme.color.BLUE100};

  animation: ${() => cardRotateAnimation('24deg')} 1.5s;
  animation-delay: 0.6s;
  animation-fill-mode: forwards;
`;
