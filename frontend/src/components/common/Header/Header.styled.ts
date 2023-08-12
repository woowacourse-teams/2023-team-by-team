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

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
`;

export const Divider = styled.div`
  width: 1px;
  height: 24px;

  background-color: ${({ theme }) => theme.color.GRAY500};
`;

export const TeamNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  object-fit: cover;
`;

export const teamPlaceName = css`
  font-size: 24px;
  font-weight: bold;
`;

export const userInfoButton = css`
  display: flex;
  gap: 2px;
  align-items: center;
`;
