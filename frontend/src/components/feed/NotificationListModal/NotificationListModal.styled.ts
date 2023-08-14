import { css, styled } from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 20px;

  width: 340px;
  max-height: 400px;
  padding: 20px;

  border-radius: 8px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({ theme }) => theme.color.WHITE};
`;

export const NotificationList = styled.ul`
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;

  width: 100%;
  margin-top: 16px;
  padding-bottom: 10px;
  gap: 18px;
`;

export const NotificationItem = styled.li`
  display: flex;
  flex-direction: column;

  padding: 16px 18px;
  gap: 10px;

  border: 1px solid ${({ theme }) => theme.color.GRAY200};
  border-radius: 8px;
`;

export const content = css`
  line-height: 1.5;
`;

export const createdAtText = css`
  color: ${({ theme }) => theme.color.GRAY600};
`;

export const lastNotificationText = css`
  margin: 0 auto;
`;
