import { css, styled } from 'styled-components';
import type { ThreadSize } from '~/types/size';

export const Container = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: column;

  width: 100%;
  gap: 10px;
`;

export const BodyContainer = styled.div<{ isMe: boolean }>`
  display: flex;
  align-items: flex-end;

  gap: 10px;

  ${({ isMe }) => isMe && 'flex-direction: row-reverse'};
`;

export const ContentContainer = styled.div<{ isMe: boolean; height: number }>`
  display: flex;
  flex-direction: column;

  max-width: 80%;
  max-height: ${({ height }) => height}px;

  ${({ isMe, theme }) => {
    if (isMe)
      return css`
        background-color: ${theme.color.PRIMARY900};
        border-radius: 12px 12px 0 12px;
      `;

    return css`
      background-color: ${theme.color.GRAY150};
      border-radius: 0 12px 12px 12px;
    `;
  }}

  transition: 0.3s;
`;

export const ContentWrapper = styled.div`
  position: relative;
  overflow: hidden;

  padding: 16px 28px;
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

export const ProfileImg = styled.img`
  width: 30px;
  height: 30px;

  border-radius: 50%;

  object-fit: cover;
`;

export const ThumbnailListWrapper = styled.div<{ marginBottom: boolean }>`
  margin: 20px;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? '20px' : '0')};
`;

export const threadInfoText = css`
  white-space: pre-wrap;

  font-size: 14px;
  color: ${({ theme }) => theme.color.BLACK};
`;

export const contentField = (threadSize: ThreadSize, isMe: boolean) => css`
  width: 100%;
  white-space: pre-wrap;

  font-size: ${threadSize === 'md' ? 18 : 16}px;
  color: ${({ theme }) => (isMe ? theme.color.WHITE : theme.color.BLACK)};

  word-break: break-all;
`;
