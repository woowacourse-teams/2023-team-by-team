import { styled, keyframes } from 'styled-components';

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

export const WritingLinesContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 50px;

  padding-top: 30px;
`;

const blink = keyframes`
  0% {
    opacity: 1;
  }
  12% {
    opacity: 0.4;
  }
  24%,
  100% {
    opacity: 1;
  }
`;

export const FolderOpenIconWrapper = styled.div`
  width: 80px;
  height: 60px;
`;

export const WritingLine = styled.div<{
  width: string;
  delay: string;
}>`
  width: ${({ width }) => width};
  height: 8px;

  background-color: ${({ theme }) => theme.color.BLUE500};

  animation: ${blink} 5s infinite;
  animation-delay: ${({ delay }) => delay};
`;
