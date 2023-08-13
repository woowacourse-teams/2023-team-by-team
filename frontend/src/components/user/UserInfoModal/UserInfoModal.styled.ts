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

  padding: 8px;
  gap: 2px;
  margin: 0 auto;
`;

export const userName = css`
  margin: 0 auto;

  font-weight: 500;
`;

export const email = css`
  margin: 0 auto;

  font-size: 14px;
  color: ${({ theme }) => theme.color.GRAY600};
`;
