import { css, styled } from 'styled-components';
import type { TeamBadgeProps } from '~/components/common/TeamBadge/TeamBadge';

export const Wrapper = styled.div<TeamBadgeProps>`
  ${({ size }) => {
    if (size === 'sm')
      return css`
        width: 8px;
        height: 8px;
      `;
    if (size === 'lg')
      return css`
        width: 24px;
        height: 24px;
      `;
    return css`
      width: 20px;
      height: 20px;
    `;
  }}

  border-radius: 50%;
  background-color: ${({ theme, teamPlaceColor }) =>
    theme.teamColor[teamPlaceColor]};
`;
