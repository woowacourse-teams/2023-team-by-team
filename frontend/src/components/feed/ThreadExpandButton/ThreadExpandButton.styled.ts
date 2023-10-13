import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 100%;
  height: 100%;
`;

export const expandButton = (isMe: boolean, size: 'md' | 'sm') => css`
  width: 100%;
  height: ${size === 'md' ? '80px' : '70px'};
  padding: 30px 10px 10px 10px;
  margin-top: -30px;

  ${isMe
    ? css`
        border-bottom-left-radius: 12px;
      `
    : css`
        border-radius: 0 0 12px 12px;
      `}
  background: ${({ theme }) =>
    isMe ? theme.gradient.BLURPLE('50px') : theme.gradient.WHITE('50px')};

  color: ${({ theme }) => (isMe ? theme.color.WHITE : theme.color.BLACK)};

  & svg {
    width: ${size === 'md' ? '32px' : '26px'};
  }
`;
