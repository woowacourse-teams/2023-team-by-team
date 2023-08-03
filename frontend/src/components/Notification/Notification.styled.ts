import { css, styled } from 'styled-components';
import type { NotificationProps } from '~/components/Notification/Notification';

export const Wrapper = styled.div<Pick<NotificationProps, 'color' | 'size'>>`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 100%;
  padding: 10px 50px;
  height: ${({ size }) => (size === 'md' ? 50 : 42)}px;

  color: ${({ theme }) => theme.color.WHITE};
  white-space: nowrap;
  text-overflow: ellipsis;

  background-color: ${({ color }) => color};
  border-radius: 20px;

  filter: brightness(1.2);
  box-shadow: 0 0 8px ${({ theme }) => theme.color.GRAY500};

  &.can-hover {
    &:hover {
      height: 110px;
      white-space: normal;
      text-overflow: initial;
    }

    transition: 0.2s;
  }
`;

export const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 700px;
  height: 100%;
`;

export const notification = css`
  overflow: hidden;

  width: 100%;
  max-height: 100%;

  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.8px;
`;
