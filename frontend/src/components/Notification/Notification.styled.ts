import { css, styled } from 'styled-components';
import type { NotificationProps } from '~/components/Notification/Notification';

export const Wrapper = styled.div<
  Pick<NotificationProps, 'teamPlaceColor' | 'size'>
>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 10px 0;
  height: ${({ size }) => (size === 'md' ? 50 : 42)}px;

  color: ${({ theme }) => theme.color.WHITE};

  background-color: ${({ theme, teamPlaceColor = 0 }) =>
    theme.teamColor[teamPlaceColor]};
  border-radius: 20px;

  filter: brightness(1.2);
  box-shadow: 0 0 8px ${({ theme }) => theme.color.GRAY500};
`;

export const notification = css`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.8px;
`;
