import styled, { css } from 'styled-components';

export const teamInfo = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const teamPlaceButton = css`
  width: 300px;
  height: 40px;
  padding: 0;

  border: 1px solid ${({ theme }) => theme.color.GRAY200};
  border-radius: 4px;
`;

export const teamPlaceName = css`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;

  width: 300px;
  margin-left: 6px;

  font: bold 24px/26px 'Pretendard';
  white-space: nowrap;
`;

export const teamName = css`
  font-size: 24px;
  font-weight: bold;
`;
