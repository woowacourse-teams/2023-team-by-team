import { styled } from 'styled-components';

export const Container = styled.div.attrs<{
  $relativeX: number;
  $relativeY: number;
}>(({ $relativeX, $relativeY }) => ({
  style: {
    transform: `translate(${$relativeX}px, ${$relativeY}px)`,
  },
}))`
  display: flex;
  flex-direction: column;
  position: absolute;

  width: 100%;
  height: 100%;
`;

export const CalendarRow = styled.div`
  position: relative;
  flex-grow: 1;
`;
