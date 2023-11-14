import { styled } from 'styled-components';

export const Container = styled.div<{ $visible: boolean }>`
  ${({ $visible }) => !$visible && 'display: none'};
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.color.WHITE_BLUR};

  cursor: all-scroll;
`;
