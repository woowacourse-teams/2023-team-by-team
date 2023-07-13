import { styled } from 'styled-components';

interface WrapperProps {
  isSunday: boolean;
  isSaturday: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  color: ${({ isSaturday, isSunday, theme }) => {
    if (isSunday) return theme.color.RED;
    if (isSaturday) return theme.color.PRIMARY;
    return theme.color.BLACK;
  }};
`;
