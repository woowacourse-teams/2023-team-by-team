import { css, styled } from 'styled-components';
import type { DateCellSize } from '~/types/size';

interface WrapperProps {
  isSunday: boolean;
  isSaturday: boolean;
  size: DateCellSize;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;

  ${({ size }) => {
    if (size === 'sm')
      return css`
        align-items: center;
        padding-top: 4px;
      `;
    if (size === 'md') return css``;
    if (size === 'lg')
      return css`
        align-items: flex-end;
        padding: 2px 2px 0 0;

        text-align: right;
      `;
  }};

  color: ${({ isSaturday, isSunday, theme }) => {
    if (isSunday) return theme.color.RED;
    if (isSaturday) return theme.color.PURPLE;
    return theme.color.BLACK;
  }};

  cursor: pointer;
`;

export const DateBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 20px;
  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY300};
  }
`;

export const dateText = (isCurrentMonth: boolean, size: DateCellSize) => css`
  font-size: ${size === 'sm' ? 14 : 12}px;
  opacity: ${isCurrentMonth ? 1 : 0.3};
`;
