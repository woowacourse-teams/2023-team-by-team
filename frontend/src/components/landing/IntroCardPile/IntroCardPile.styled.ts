import { styled, css, keyframes } from 'styled-components';
import type { CSSProp } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  display: inline-block;
  overflow: hidden;
  bottom: 0;
  left: 0;

  width: 1100px;
  height: 910px;

  transform-origin: bottom left;
  pointer-events: none;

  @media screen and (max-height: 900px) {
    transform: scale(0.85);
  }

  @media screen and (max-height: 700px) {
    transform: scale(0.75);
  }

  @media screen and (max-height: 650px) {
    transform: scale(0.62);
  }

  @media screen and (max-height: 550px) {
    transform: scale(0.5);
  }
`;

const cardRotate = (afterDegree: string) => keyframes`
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

const invertedFadeInOut = keyframes`
  0% {
    opacity: 1;
  }
  14%,
  86% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Blind = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.color.BLUE100};

  animation: ${invertedFadeInOut} 7s 2.5s infinite;
`;

export const card1 = css`
  background-color: ${({ theme }) => theme.color.BLUE400};

  animation: ${() => cardRotate('10deg')} 1.5s forwards;
`;

export const card2 = css`
  background-color: ${({ theme }) => theme.color.BLUE200};

  animation: ${() => cardRotate('17deg')} 1.5s forwards;
  animation-delay: 0.3s;
`;

export const card3 = css`
  background-color: ${({ theme }) => theme.color.BLUE100};

  animation: ${() => cardRotate('24deg')} 1.5s forwards;
  animation-delay: 0.6s;
`;
