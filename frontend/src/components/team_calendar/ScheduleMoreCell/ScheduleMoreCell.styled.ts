import { css, styled } from 'styled-components';
import type { ScheduleMoreCellProps } from '~/components/team_calendar/ScheduleMoreCell/ScheduleMoreCell';

export const Wrapper = styled.div<
  Pick<ScheduleMoreCellProps, 'column' | 'calendarSize'>
>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${({ calendarSize }) => (calendarSize === 'md' ? 90 : 62)}px;
  left: ${({ column }) => (column * 100) / 7}%;

  width: calc(100% / 7);
  height: 16px;

  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }

  @media screen and (max-width: 800px) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const moreText = css`
  color: ${({ theme }) => theme.color.GRAY500};
`;
