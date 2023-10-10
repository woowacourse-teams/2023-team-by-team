import { css, styled } from 'styled-components';
import type { MyDailyScheduleProps } from './MyDailySchedule';
import type { TeamPlaceColor } from '~/types/team';

export const Container = styled.div<
  Pick<MyDailyScheduleProps, 'teamPlaceColor'>
>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 260px;
  height: 60px;
  padding: 6px 12px;

  border-left: 6px solid
    ${({ theme, teamPlaceColor }) => theme.teamColor[teamPlaceColor]};
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 4px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;

  gap: 3px;

  &:last-child {
    width: 120px;
  }
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
