import { css, styled } from 'styled-components';
import type { Position } from '~/types/schedule';

export const Wrapper = styled.div<Pick<Position, 'column'>>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 90px;
  left: ${({ column }) => (column * 100) / 7}%;

  width: calc(100% / 7);
  height: 16px;

  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }
`;

export const moreText = css`
  color: ${({ theme }) => theme.color.GRAY500};
`;
