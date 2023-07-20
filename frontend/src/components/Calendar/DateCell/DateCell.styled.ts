import { css, styled } from 'styled-components';
import type { DateCellSize } from '~/types/size';

interface WrapperProps {
  isSunday: boolean;
  isSaturday: boolean;
  size: DateCellSize;
}

export const Wrapper = styled.div<WrapperProps>`
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
        padding: 8px 8px 0 0;
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
