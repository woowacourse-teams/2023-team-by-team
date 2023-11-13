import { css } from 'styled-components';

export const timeTableButton = ($isMobile: boolean) => css`
  width: ${$isMobile ? '100px' : '150px'};
  height: 40px;

  border: 1px solid ${({ theme }) => theme.color.GRAY200};
  border-radius: 4px;
`;
