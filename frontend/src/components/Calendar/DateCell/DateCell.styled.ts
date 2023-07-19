import { styled } from 'styled-components';

interface WrapperProps {
  isSunday: boolean;
  isSaturday: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  padding: 12px 12px 0 0;

  color: ${({ isSaturday, isSunday, theme }) => {
    if (isSunday) return theme.color.RED;
    if (isSaturday) return theme.color.PURPLE;
    return theme.color.BLACK;
  }};
  text-align: right;
`;
