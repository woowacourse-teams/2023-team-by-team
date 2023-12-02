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
  z-index: ${({ theme }) => theme.zIndex.LANDING_CARD};

  @media screen and (max-height: 930px) {
    transform: scale(0.9);
  }

  @media screen and (max-height: 780px) {
    transform: scale(0.78);
  }

  @media screen and (max-height: 710px) {
    transform: scale(0.7);
  }

  @media screen and (max-height: 630px) {
    transform: scale(0.62);
  }

  @media screen and (max-height: 510px) {
    transform: scale(0.5);
  }

  @media screen and (max-height: 440px) {
    transform: scale(0.41);
  }

  @media screen and (max-height: 390px) {
    transform: scale(0.35);
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

export const Card = styled.div<{ $css: CSSProp }>`
  position: absolute;
  right: 60%;
  bottom: -30%;

  width: 640px;
  height: 910px;

  box-shadow: 0 20px 40px ${({ theme }) => theme.color.TRANSPARENT_BLACK};

  transform-origin: bottom right;

  ${({ $css }) => $css}
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

export const Blind = styled.div<{ $animation: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.color.BLUE100};

  opacity: 0;

  ${({ $animation = true }) =>
    $animation &&
    css`
      opacity: 1;

      animation: ${invertedFadeInOut} 7s 1.6s infinite;
    `}
`;

export const card1 = (animation: boolean) => css`
  background-color: ${({ theme }) => theme.color.BLUE400};

  ${animation
    ? () => css`
        transform: rotate(-60deg);
        animation: ${() => cardRotate('10deg')} 1.5s forwards;
      `
    : () => css`
        transform: rotate(10deg);
      `}
`;

export const card2 = (animation: boolean) => css`
  background-color: ${({ theme }) => theme.color.BLUE200};

  ${animation
    ? () => css`
        transform: rotate(-60deg);
        animation: ${() => cardRotate('17deg')} 1.5s 0.3s forwards;
      `
    : () => css`
        transform: rotate(17deg);
      `}
`;

export const card3 = (animation: boolean) => css`
  background-color: ${({ theme }) => theme.color.BLUE100};

  ${animation
    ? () => css`
        transform: rotate(-60deg);
        animation: ${cardRotate('24deg')} 1.5s 0.6s forwards;
      `
    : () => css`
        transform: rotate(24deg);
      `}
`;
