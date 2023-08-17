import { styled, css } from 'styled-components';
import { noticeThreadBackground } from '~/assets/png';
import type { ThreadSize } from '~/types/size';

interface BoardProps {
  threadSize: ThreadSize;
  isExpanded: boolean;
  height: number;
}

export const Container = styled.div`
  position: relative;
`;

export const InnerContainer = styled.div<BoardProps>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  position: relative;

  width: 100%;
  min-height: 200px;
  max-height: ${({ height }) => height}px;
  ${({ threadSize }) => {
    if (threadSize === 'md')
      return css`
        padding: 30px 40px;
        border-radius: 40px;
      `;
    if (threadSize === 'sm')
      return css`
        padding: 16px 20px;
        border-radius: 20px;
      `;
  }}
  padding-bottom: ${({ isExpanded }) => (isExpanded ? '90px' : '26px')};

  box-shadow: 0 0 16px ${({ theme }) => theme.color.GRAY300};
  background-image: url(${noticeThreadBackground});
  background-size: 100%;

  transition: 0.3s;
`;

export const ThreadHeader = styled.header`
  display: flex;
  align-items: center;
  column-gap: 8px;

  width: 100%;
  height: 36px;
`;

export const ProfileImage = styled.img<{ threadSize: ThreadSize }>`
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
`;

export const ContentWrapper = styled.div``;

export const Divider = styled.span`
  display: inline-block;

  width: 1.5px;
  height: 20px;
  margin: 0 4px;

  background-color: ${({ theme }) => theme.color.GRAY400};
`;

export const primaryNoticeTag = css`
  position: absolute;
  top: 22px;
  right: -18px;
`;

export const threadInfoText = (threadSize: ThreadSize) => css`
  font-size: ${threadSize === 'md' ? 18 : 16}px;
`;

export const contentField = (threadSize: ThreadSize) => css`
  width: 100%;
  white-space: pre-wrap;

  font-size: ${threadSize === 'md' ? 22 : 18}px;
`;
