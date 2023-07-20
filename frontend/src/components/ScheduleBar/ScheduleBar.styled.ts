import { styled } from 'styled-components';
import type { ScheduleBar } from '~/components/ScheduleBar/ScheduleBar';

export const Wrapper = styled.div<ScheduleBar>`
  position: absolute;

  top: ${({ level }) => level * 18 + 36}px;
  width: ${({ duration }) => (duration * 100) / 7}%;
  left: ${({ column }) => (column * 100) / 7}%;
  height: 16px;

  background-color: ${({ color }) => color};

  cursor: pointer;
`;
