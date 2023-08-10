import { css, styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 64px;
  padding: 0 14px;

  border-bottom: 2px solid ${({ theme }) => theme.color.GRAY200};
`;

export const InnerContainer = styled.div`
  display: flex;
  column-gap: 20px;

  & > div {
    display: flex;
    align-items: center;
    column-gap: 12px;
  }
`;

export const TeamNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const teamPlaceName = css`
  font-size: 24px;
  font-weight: bold;
`;

export const logoutButton = css`
  display: flex;
  gap: 2px;
  align-items: center;

  padding: 8px;
`;
