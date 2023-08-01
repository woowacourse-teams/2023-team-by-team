import { css, styled } from 'styled-components';
import type { IntegratedDailyScheduleProps } from '~/components/IntegratedDailySchedule/IntegratedDailySchedule/IntegratedDailySchedule';
import type { TeamPlaceColor } from '~/types/team';

export const Container = styled.div<
  Pick<IntegratedDailyScheduleProps, 'teamPlaceColor'>
>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 260px;
  height: 60px;
  padding: 8px 12px 6px;

  border-left: 6px solid
    ${({ theme, teamPlaceColor }) => theme.teamColor[teamPlaceColor]};
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;

  gap: 4px;
`;

export const titleText = (teamPlaceColor: TeamPlaceColor) => css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 230px;

  color: ${({ theme }) => theme.teamColor[teamPlaceColor]};
`;

export const teamName = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 100px;
`;
