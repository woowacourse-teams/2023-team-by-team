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
  overflow: hidden;
  top: 50px;
  right: 20px;
  z-index: ${({ theme }) => theme.zIndex.MODAL};

  width: 270px;
  height: 420px;
  padding: 20px 30px;
  gap: 10px;

  border-radius: 8px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({ theme }) => theme.color.WHITE};
`;

export const UserInfoForm = styled.form`
  display: flex;
  align-items: center;

  column-gap: 6px;

  &:focus {
    outline: ${({ theme }) => theme.color.PRIMARY};
  }
`;

export const UserNameInputContainer = styled.div`
  width: 200px;

  border: 1px solid ${({ theme }) => theme.color.GRAY200};
  border-radius: 4px;
`;

export const UserNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 20px;
  column-gap: 5px;
`;

export const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 10px auto;

  border-radius: 50%;
  object-fit: cover;
`;

export const DangerousSvgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;

    color: ${({ theme }) => theme.color.RED};
  }
`;

export const dangerousButton = css`
  display: flex;
  position: relative;
  align-self: flex-end;
  align-items: center;
  padding: 0px;

  cursor: pointer;

  & svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover p {
    opacity: 1;
  }

  &:hover svg {
    opacity: 0;
  }
`;

export const hoverText = css`
  opacity: 0;
  color: ${({ theme }) => theme.color.RED};
`;

export const logoutButton = css`
  display: flex;
  align-items: center;

  margin: 0 auto;
  padding: 8px;
  gap: 2px;
`;

export const userName = css`
  overflow: hidden;

  max-width: 140px;

  font-weight: 500;
  white-space: pre;
  text-overflow: ellipsis;
  text-align: center;
`;

export const email = css`
  margin: 0 auto;

  font-size: 14px;
  color: ${({ theme }) => theme.color.GRAY600};
`;

export const userInfoEditButton = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;
  padding: 2px;

  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }
`;

export const userInfoSubmitButton = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;
  padding: 2px;

  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }
`;

export const userNameLength = css`
  font-size: 12px;
  color: ${({ theme }) => theme.color.GRAY600};
  white-space: pre;
`;

export const userNameInput = css`
  border: none;
  border-radius: 4px;

  &:focus {
    outline: none;
  }
`;
