import { styled, css } from 'styled-components';
import { noticeThreadBackground } from '~/assets/png';
import type { NoticeSize } from '~/types/size';

export const Container = styled.div<{ noticeSize: NoticeSize }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  padding-top: 10px;

  background-color: ${({ theme }) => theme.color.GRAY100};
  border-bottom: 2px solid ${({ theme }) => theme.color.PRIMARY200};
  
  transition: 0.3s;

  ${({ noticeSize }) => {
    if (noticeSize === 'sm')
      return css`
        height: 80px;
      `;
    if (noticeSize === 'md')
      return css`
        height: 140px;
      `;
    if (noticeSize === 'lg')
      return css`
        height: 610px;
      `;
  }}
`;

export const BackgroundContainer = styled.div<{ noticeSize: NoticeSize }>`
  display: flex;
  justify-content: space-between;

  height: 100%;

  border-radius: 20px 20px 0 0;
  background-image: url(${noticeThreadBackground});
  background-size: 100%;

  transition: 0.3s;

  ${({ noticeSize }) => {
    if (noticeSize === 'sm')
      return css`
        padding: 18px 20px 18px 28px;
      `;
    if (noticeSize === 'md')
      return css`
        padding: 18px 20px 18px 28px;
      `;
    if (noticeSize === 'lg')
      return css`
        flex-direction: column;

        padding: 18px 20px 10px 28px;
      `;
  }}
`;

export const InnerContainer = styled.div<{ noticeSize: NoticeSize }>`
  display: flex;
  ${({ noticeSize }) => {
    if (noticeSize === 'sm')
      return css`
        width: calc(100% - 64px);

        gap: 26px;
      `;
    if (noticeSize === 'md')
      return css`
        width: calc(100% - 64px);
        gap: 26px;
      `;
    if (noticeSize === 'lg')
      return css`
        flex-direction: column;
        row-gap: 20px;
      `;
  }}
`;

export const InnerContainer = styled.div<{ noticeSize: NoticeSize }>`
  display: flex;
  gap: 10px;
`;

export const ArrowContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const ArrowIcon = styled.div<{ disabled: boolean }>`
  width: 32px;
  height: 32px;

  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};

  color: ${({ theme }) => theme.color.PRIMARY900};
`;

export const MegaphoneWrapper = styled.div`
  width: 40px;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  overflow: hidden;
  column-gap: 8px;

  height: 16px;
`;

export const ContentContainer = styled.div<{ noticeSize: NoticeSize }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  width: 100%;
  gap: 4px;

  ${({ noticeSize }) => {
    if (noticeSize === 'lg')
      return css`
        height: 550px;
      `;
  }}
`;

export const Divider = styled.span`
  display: inline-block;

  width: 1.5px;
  height: 16px;
  margin: 0 4px;

  background-color: ${({ theme }) => theme.color.GRAY400};
`;

export const authorInfoText = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${({ theme }) => theme.color.GRAY500};
`;

export const timeInfoText = css`
  color: ${({ theme }) => theme.color.GRAY500};
`;

export const contentField = (noticeSize: NoticeSize) => {
  let height = '';

  if (noticeSize === 'sm') height = '24px';
  if (noticeSize === 'md') height = '72px';
  if (noticeSize === 'lg') height = '100%';

  return css`
    overflow: ${noticeSize === 'lg' ? ' auto' : ' hidden'};
    text-overflow: ellipsis;
    white-space: pre-wrap;

    width: 100%;
    height: ${height};
  `;
};

export const arrowButton = css`
  padding: 0;
`;
