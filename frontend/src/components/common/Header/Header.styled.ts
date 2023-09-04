import { css, styled } from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;

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
  column-gap: 10px;
`;

export const Divider = styled.div`
  width: 1px;
  height: 24px;

  background-color: ${({ theme }) => theme.color.GRAY500};
`;

export const TeamBadgeWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  & svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    opacity: 0;
  }

  &:hover {
    opacity: 0.8;
  }

  &:hover svg {
    opacity: 1;
  }
`;

export const TeamBadgeEditIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 20px;
    height: 20px;

    color: ${({ theme }) => theme.color.WHITE};
  }
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

export const notificationButton = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  padding: 0;

  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }
`;

export const teamPlaceInfoButton = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  padding: 0;

  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }
`;

export const userInfoButton = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;
  padding: 0;
`;
