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

  width: 320px;
  height: 500px;
  padding: 20px 30px;

  border-radius: 8px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({ theme }) => theme.color.WHITE};

  overflow: hidden;
`;

export const TeamPlaceName = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;
  margin-bottom: 10px;
`;

export const MemberDescription = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MemberList = styled.ul`
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;

  max-height: 240px;
  margin: 20px 0 20px 0;
`;

export const MemberListItem = styled.li`
  display: flex;
  align-items: center;

  height: 50px;
  padding: 8px;
  column-gap: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.GRAY300};
  }
`;

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;

  border-radius: 50%;
  object-fit: cover;
`;

export const InviteCodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid ${({ theme }) => theme.color.GRAY300};
  border-radius: 8px;

  margin: 10px 0 20px 0;
`;

export const InviteCodeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80%;
  height: 40px;
  padding: 0 8px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;

  margin-bottom: 20px;

  background-color: ${({ theme }) => theme.color.GRAY400};
`;

export const MyUserInfo = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  column-gap: 10px;
`;

export const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  border-radius: 50%;

  background-color: ${({ theme }) => theme.color.GRAY600};

  color: ${({ theme }) => theme.color.WHITE};
`;

export const MyUserInfoForm = styled.form`
  display: flex;
  align-items: center;

  width: 100%;
`;

export const UserNameInputContainer = styled.div`
  width: 160px;

  border: 1px solid ${({ theme }) => theme.color.GRAY200};
  border-radius: 4px;
`;

export const teamName = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 200px;
`;

export const copyButton = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 40px;
  padding: 0;

  background-color: ${({ theme }) => theme.color.GRAY100};
  border-radius: 0 8px 8px 0;
`;

export const userInfoEditButton = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;
  padding: 2px;
  margin-left: auto;

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
  margin-left: auto;

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

export const userName = css`
  max-width: 120px;

  font-weight: 500;

  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
  text-align: center;
`;
