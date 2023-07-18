import { styled } from 'styled-components';
import type { ScheduleBarProps } from '~/components/ScheduleBar/ScheduleBar';

export const Wrapper = styled.div<ScheduleBarProps>`
  position: absolute;

  width: ${({ duration }) => (duration * 100) / 7}%;
  left: ${({ startPosition }) => (startPosition * 100) / 7}%;
  height: 16px;

  background-color: ${({ color }) => color};
`;
