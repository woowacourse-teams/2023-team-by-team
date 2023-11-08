import { css, styled } from 'styled-components';
import type { ScheduleBarProps } from '~/components/team_calendar/ScheduleBar/ScheduleBar';
import type { CalendarSize } from '~/types/size';
import type { TeamPlaceColor } from '~/types/team';

interface InnerProps {
  column: number;
  duration: number;
  level: number;
  roundedStart: boolean;
  roundedEnd: boolean;
  mode?: 'normal' | 'no-interaction' | 'indicator';
  teamPlaceColor: TeamPlaceColor;
}

export const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      'id',
      'scheduleId',
      'schedule',
      'calendarSize',
      'level',
      'row',
      'column',
      'duration',
      'roundedStart',
      'roundedEnd',
      'mode',
    ].includes(prop),
})<
  Pick<
    ScheduleBarProps,
    | 'calendarSize'
    | 'level'
    | 'column'
    | 'duration'
    | 'roundedStart'
    | 'roundedEnd'
    | 'mode'
  >
>`
  position: absolute;
  ${({ calendarSize, level }) => {
    if (calendarSize === 'md')
      return css`
        top: ${level * 18 + 36}px;
        height: 16px;
      `;
    if (calendarSize === 'sm')
      return css`
        top: ${level * 14 + 22}px;
        height: 12px;
      `;
  }}

  left: ${({ column }) => (column * 100) / 7}%;
  width: ${({ duration }) => (duration * 100) / 7}%;
  padding: ${({ roundedStart, roundedEnd }) =>
    `0 ${roundedEnd ? '4px' : 0} 0 ${roundedStart ? '4px' : 0}`};
`;

export const Inner = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      'id',
      'scheduleId',
      'schedule',
      'row',
      'column',
      'duration',
      'level',
      'roundedStart',
      'roundedEnd',
      'teamPlaceColor',
      'mode',
    ].includes(prop),
})<InnerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  padding-left: 6px;

  background-color: ${({ theme, teamPlaceColor = 0 }) =>
    theme.teamColor[teamPlaceColor]};
  border-radius: ${({ roundedStart, roundedEnd }) =>
    `${roundedStart ? '4px' : '0'} ${roundedEnd ? '4px 4px' : '0 0'} ${
      roundedStart ? '4px' : '0'
    }`};

  filter: brightness(${({ level }) => 1 + level * 0.4});

  ${({ mode = 'normal' }) =>
    mode === 'normal' &&
    css`
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    `};
`;

export const scheduleBarTitle = (calendarSize: CalendarSize) => css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 100px;
  height: 100%;

  font-size: ${calendarSize === 'md' ? 12 : 10}px;
  color: ${({ theme }) => theme.color.WHITE};
`;
