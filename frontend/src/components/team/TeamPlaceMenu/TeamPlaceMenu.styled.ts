import { css } from 'styled-components';

export const teamInfo = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const teamPlaceButton = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 40px;
  padding: 0;

  border-bottom: 1px solid ${({ theme }) => theme.color.GRAY200};
  border-radius: 4px;

  & svg {
    width: 24px;
    height: 24px;
    padding: 0;
  }
`;

export const teamPlaceName = css`
  overflow: hidden;
  text-overflow: ellipsis;

  width: 260px;

  font-size: 22px;
  line-height: 22px;
  white-space: nowrap;
`;

export const teamName = css`
  font-size: 24px;
  font-weight: bold;
`;
