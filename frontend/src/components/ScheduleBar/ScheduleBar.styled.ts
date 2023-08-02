import { css, styled } from 'styled-components';
import type { ScheduleBarProps } from '~/components/ScheduleBar/ScheduleBar';

export const Wrapper = styled.div<ScheduleBarProps>`
  position: absolute;

  top: ${({ level }) => level * 18 + 36}px;
  left: ${({ column }) => (column * 100) / 7}%;

  width: ${({ duration }) => (duration * 100) / 7}%;
  height: 16px;

  padding: 0 4px;
`;

export const Inner = styled.div<Pick<ScheduleBarProps, 'color' | 'level'>>`
  display: flex;
  align-items: center;

  height: 100%;

  padding-left: 6px;

  background-color: ${({ color }) => color};
  border-radius: 4px;

  filter: brightness(${({ level }) => 1 + level * 0.5});

  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const scheduleBarTitle = css`
  font-size: 13px;

  color: ${({ theme }) => theme.color.WHITE};
`;
