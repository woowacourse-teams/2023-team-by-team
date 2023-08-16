import { css } from 'styled-components';

export const teamPlaceButton = css`
  width: 300px;
  height: 40px;
  padding: 0;

  border: 1px solid ${({ theme }) => theme.color.GRAY200};
  border-radius: 4px;
`;

export const teamPlaceName = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-size: 26px;
  font-weight: bold;
`;

export const teamName = css`
  font-size: 24px;
  font-weight: bold;
`;
