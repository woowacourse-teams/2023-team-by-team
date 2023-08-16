import { css, styled } from 'styled-components';
import type { ThreadSize } from '~/types/size';

export const Container = styled.div<{ threadSize: ThreadSize }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  height: auto;

  ${({ threadSize }) => {
    if (threadSize === 'md')
      return css`
        gap: 16px;

        padding: 30px 50px;
        border-radius: 40px;
      `;
    if (threadSize === 'sm')
      return css`
        gap: 8px;

        padding: 16px 30px;
        border-radius: 20px;
      `;
  }}

  background: ${({ theme }) => theme.color.WHITE};

  box-shadow: 0 0 8px ${({ theme }) => theme.color.GRAY300};
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
  ${({ threadSize }) => {
    if (threadSize === 'md')
      return css`
        width: 40px;
        height: 40px;

        border-radius: 12px;
      `;
    if (threadSize === 'sm')
      return css`
        width: 30px;
        height: 30px;

        border-radius: 8px;
      `;
  }}

  object-fit: cover;
`;

export const Divider = styled.span`
  display: inline-block;

  width: 1.5px;
  height: 20px;
  margin: 0 4px;

  background-color: ${({ theme }) => theme.color.GRAY400};
`;

export const threadInfoText = (threadSize: ThreadSize) => css`
  font-size: ${threadSize === 'md' ? 18 : 16}px;
`;

export const contentField = (threadSize: ThreadSize) => css`
  width: 100%;
  white-space: pre-wrap;

  font-size: ${threadSize === 'md' ? 20 : 16}px;
`;
