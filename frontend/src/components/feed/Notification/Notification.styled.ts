import { css, styled } from 'styled-components';
import type { NotificationProps } from '~/components/feed/Notification/Notification';
import type { ThreadSize } from '~/types/size';

export const Wrapper = styled.div<
  Pick<NotificationProps, 'teamPlaceColor' | 'threadSize'>
>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  color: ${({ theme }) => theme.color.WHITE};
  white-space: pre-wrap;

  background-color: ${({ theme, teamPlaceColor = 0 }) =>
    theme.teamColor[teamPlaceColor]};

  filter: brightness(1.2);
  box-shadow: 0 0 8px ${({ theme }) => theme.color.GRAY500};

  ${({ threadSize }) => {
    if (threadSize === 'md')
      return css`
        padding: 10px 50px;
        height: 50px;

        border-radius: 20px;
      `;

    if (threadSize === 'sm')
      return css`
        padding: 10px 20px;
        height: 42px;

        border-radius: 16px;
      `;
  }}

  &.can-hover {
    &:hover {
      height: 130px;
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

export const notification = (threadSize: ThreadSize) => css`
  overflow: hidden;

  width: 100%;
  max-height: 100%;

  font-size: ${threadSize === 'md' ? 18 : 16}px;
  font-weight: 500;
  letter-spacing: 0.8px;
`;
