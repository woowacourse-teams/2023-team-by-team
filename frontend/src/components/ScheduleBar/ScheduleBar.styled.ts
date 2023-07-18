import { styled } from 'styled-components';

export const Wrapper = styled.div<{ color: string }>`
  position: absolute;

  width: 14.2857%;
  left: 57.1429%;
  height: 16px;

  background-color: ${({ color }) => color};
`;
