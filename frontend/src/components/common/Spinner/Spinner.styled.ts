import styled, { css, keyframes } from 'styled-components';
import type { SpinnerProps } from '~/components/common/Spinner/Spinner';

const spin = keyframes` 
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const Loader = styled.div<Pick<SpinnerProps, 'size'>>`
  position: absolute;
  top: 50%;
  left: 50%;

  ${({ size }) => {
    if (size === 'sm')
      return css`
        width: 50px;
        height: 50px;
      `;
    if (size === 'md')
      return css`
        width: 100px;
        height: 100px;
      `;

    return css`
      width: 150px;
      height: 150px;
    `;
  }}

  transform: translate(-50%, -50%);

  animation: ${spin} 0.6s linear infinite reverse;
`;

export const Ball = styled.div<Pick<SpinnerProps, 'color'>>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  animation: ${spin} 1s infinite ease-in-out;

  &::after {
    content: '';
    position: absolute;
    background-color: ${({ theme, color = theme.color.BLACK }) => color};
    width: 5px;
    height: 5px;
    border-radius: 100%;
    top: 0;
  }

  &:nth-child(2) {
    animation-delay: -0.1s;
  }
  &:nth-child(3) {
    animation-delay: -0.2s;
  }
  &:nth-child(4) {
    animation-delay: -0.3s;
  }
  &:nth-child(5) {
    animation-delay: -0.4s;
  }
  &:nth-child(6) {
    animation-delay: -0.5s;
  }
  &:nth-child(7) {
    animation-delay: -0.6s;
  }
  &:nth-child(8) {
    animation-delay: -0.7s;
  }
  &:nth-child(9) {
    animation-delay: -0.8s;
  }
  &:nth-child(10) {
    animation-delay: -0.9s;
  }
`;
