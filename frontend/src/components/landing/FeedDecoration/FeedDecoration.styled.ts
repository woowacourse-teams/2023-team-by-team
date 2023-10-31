import { styled, css, keyframes } from 'styled-components';
import type { CSSProp } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  width: 100%;
  height: 100%;
  padding: 50px;
`;

export const SampleBadge = styled.div`
  width: 36px;
  height: 36px;

  border-radius: 18px;
  background-color: ${({ theme }) => theme.color.BLUE600};
`;

export const SampleThread = styled.div<{ $css: CSSProp }>`
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  width: 100%;
  padding: 30px;

  border-radius: 20px;

  ${({ $css }) => $css};
`;

export const CircleButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  position: absolute;
  top: 476px;
  right: 66px;
`;

export const CircleButton = styled.div`
  width: 68px;
  height: 68px;
  padding: 14px;

  border-radius: 34px;
  background-color: #193ecb;

  & svg {
    width: 100%;
    height: 100%;

    color: ${({ theme }) => theme.color.BLUE400};
  }
`;

const fillToRight = (width: string) => keyframes`
  from {
    width: 0;
  }
  to {
    width: ${width};
  }
`;

export const WritingLine = styled.div<{
  $width: string;
  $delay: string;
  $color: 'dark' | 'light';
}>`
  width: 0;
  height: 20px;
  border-radius: 10px;

  background-color: ${({ $color, theme }) =>
    $color === 'dark' ? theme.color.BLUE500 : theme.color.BLUE600};

  animation: ${({ $width }) => fillToRight($width)} 2.5s forwards;
  animation-delay: ${({ $delay }) => $delay};
`;

export const sampleThread1 = css`
  height: 200px;

  background-color: ${({ theme }) => theme.color.BLUE700};
`;

export const sampleThread2 = css`
  height: 150px;

  background-color: ${({ theme }) => theme.color.BLUE300};
`;

export const sampleThread3 = css`
  height: 120px;

  background-color: ${({ theme }) => theme.color.BLUE300};
`;
