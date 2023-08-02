import { css, styled } from 'styled-components';
import type { ScheduleBarProps } from '~/components/ScheduleBar/ScheduleBar';

export const Wrapper = styled.div<
  Pick<
    ScheduleBarProps,
    'level' | 'column' | 'duration' | 'roundedStart' | 'roundedEnd'
  >
>`
  position: absolute;
  top: ${({ level }) => level * 18 + 36}px;
  left: ${({ column }) => (column * 100) / 7}%;

  width: ${({ duration }) => (duration * 100) / 7}%;
  height: 16px;

  padding: ${({ roundedStart, roundedEnd }) =>
    `0 ${roundedEnd ? '4px' : 0} 0 ${roundedStart ? '4px' : 0}`};
`;

export const Inner = styled.div<
  Pick<ScheduleBarProps, 'color' | 'level' | 'roundedStart' | 'roundedEnd'>
>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  padding-left: 6px;

  background-color: ${({ color }) => color};
  border-radius: ${({ roundedStart, roundedEnd }) =>
    `${roundedStart ? '4px' : '0'} ${roundedEnd ? '4px 4px' : '0 0'} ${
      roundedStart ? '4px' : '0'
    }`};

  filter: brightness(${({ level }) => 1 + level * 0.5});

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const scheduleBarTitle = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 100px;
  height: 100%;

  font-size: 13px;
  color: ${({ theme }) => theme.color.WHITE};
`;
