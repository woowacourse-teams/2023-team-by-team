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
  align-items: flex-end;
  ${({ size }) => {
    if (size === 'sm')
      return css`
        padding-top: 4px;
        text-align: center;
        font-size: 10px;
      `;
    if (size === 'md') return css``;
    if (size === 'lg')
      return css`
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

export const TeamColorBadge = styled.div`
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
