import { styled } from 'styled-components';

export const Container = styled.div<{ $relativeX: number; $relativeY: number }>`
  display: flex;
  flex-direction: column;
  position: absolute;

  width: 100%;
  height: 100%;

  transform: ${({ $relativeX, $relativeY }) =>
    `translate(${$relativeX}px, ${$relativeY}px)`};
`;

export const CalendarRow = styled.div`
  position: relative;
  flex-grow: 1;
`;
