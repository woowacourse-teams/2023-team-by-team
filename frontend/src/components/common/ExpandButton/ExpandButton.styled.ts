import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 100%;
  height: 100%;
`;

export const expandButton = (
  buttonTheme: 'white' | 'blurple',
  size: 'md' | 'sm',
) => css`
  width: 100%;
  height: ${size === 'md' ? '80px' : '70px'};
  padding: 30px 10px 10px 10px;
  margin-top: -30px;

  background: ${({ theme }) =>
    buttonTheme === 'white'
      ? theme.gradient.WHITE('50px')
      : theme.gradient.BLURPLE('50px')};

  color: ${({ theme }) =>
    buttonTheme === 'white' ? theme.color.BLACK : theme.color.WHITE};

  & svg {
    width: ${size === 'md' ? '32px' : '26px'};
  }
`;
