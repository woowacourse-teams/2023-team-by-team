import { styled, css } from 'styled-components';
import { noticeThreadBackground } from '~/assets/png';

interface BoardProps {
  isExpanded: boolean;
  height: number;
}

export const ThreadContainer = styled.div`
  position: relative;
`;

export const Thread = styled.div<BoardProps>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  position: relative;

  width: 100%;
  min-height: 200px;
  max-height: ${({ height }) => height}px;
  padding: 26px;
  padding-bottom: ${({ isExpanded }) => (isExpanded ? '90px' : '26px')};

  border-radius: 40px;
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

export const ProfileImage = styled.img`
  width: 36px;
  height: 36px;

  border-radius: 8px;
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
