import { css, styled } from 'styled-components';
import type { ThreadSize } from '~/types/size';

export const Container = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: column;

  width: 100%;
  gap: 10px;

  align-items: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
`;

export const ContentContainer = styled.div<{ isMe: boolean }>`
  display: flex;

  align-items: flex-end;

  gap: 10px;

  ${({ isMe }) => isMe && `flex-direction: row-reverse`}
`;

export const ContentWrapper = styled.div<{
  threadSize: ThreadSize;
  isMe: boolean;
}>`
  max-width: 80%;
  height: auto;

  ${({ threadSize }) => {
    if (threadSize === 'md')
      return css`
        padding: 28px;
      `;

    if (threadSize === 'sm')
      return css`
        padding: 16px 28px;
      `;
  }}

  ${({ isMe, theme }) => {
    if (isMe)
      return css`
        background: ${theme.color.PRIMARY900};
        border-radius: 12px 12px 0 12px;
      `;

    return css`
      background: ${theme.color.GRAY150};
      border-radius: 12px 12px 12px 0;
    `;
  }}
`;

export const ThreadHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  height: 36px;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProfileImg = styled.img<{ threadSize: ThreadSize }>`
  border-radius: 50%;

  ${({ threadSize }) => {
    if (threadSize === 'md')
      return css`
        width: 40px;
        height: 40px;
      `;
    if (threadSize === 'sm')
      return css`
        width: 30px;
        height: 30px;
      `;
  }}

  object-fit: cover;
`;

export const threadInfoText = (threadSize: ThreadSize) => css`
  white-space: pre-wrap;

  font-size: ${threadSize === 'md' ? 18 : 16}px;
`;

export const contentField = (threadSize: ThreadSize, isMe: boolean) => css`
  width: 100%;
  white-space: pre-wrap;

  font-size: ${threadSize === 'md' ? 20 : 16}px;
  color: ${({ theme }) => (isMe ? theme.color.WHITE : theme.color.BLACK)};
`;
