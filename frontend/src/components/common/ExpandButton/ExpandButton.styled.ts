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
  height: ${size === 'md' ? '50px' : '40px'};
  padding: 10px;

  background-color: ${({ theme }) =>
    buttonTheme === 'white' ? theme.color.GRAY150 : theme.color.PRIMARY900};

  color: ${({ theme }) =>
    buttonTheme === 'white' ? theme.color.BLACK : theme.color.WHITE};

  & svg {
    width: ${size === 'md' ? '32px' : '26px'};
  }
`;
