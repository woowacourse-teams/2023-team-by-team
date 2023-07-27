import { styled } from 'styled-components';
import type { NotificationProps } from '~/components/Notification/Notification';

export const Container = styled.div<Pick<NotificationProps, 'color' | 'size'>>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: ${({ size }) => (size === 'md' ? 50 : 42)}px;

  background-color: ${({ color }) => color};
  border-radius: 20px;

  filter: brightness(1.7);
`;
