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

  width: 270px;
  height: 400px;
  padding: 20px 30px;
  gap: 10px;

  border-radius: 8px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({ theme }) => theme.color.WHITE};

  overflow: hidden;
`;

export const UserInfoForm = styled.form`
  display: flex;
  align-items: center;

  column-gap: 6px;
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

export const logoutButton = css`
  display: flex;
  align-items: center;

  margin: 0 auto;
  padding: 8px;
  gap: 2px;
`;

export const userName = css`
  max-width: 140px;

  font-weight: 500;

  overflow: hidden;
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
