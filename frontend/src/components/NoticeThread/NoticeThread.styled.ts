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
  padding: 25px;
  padding-bottom: ${({ isExpanded }) => (isExpanded ? '90px' : '25px')};

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
  height: 35px;
`;

export const ProfileImage = styled.img`
  width: 35px;
  height: 35px;

  border-radius: 8px;
`;

export const PostDateContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

export const Content = styled.p``;

export const primaryNoticeTag = css`
  position: absolute;
  top: 20px;
  right: -20px;
`;
