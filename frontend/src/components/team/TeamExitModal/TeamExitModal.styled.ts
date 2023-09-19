import { css, styled } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: ${({ theme }) => theme.zIndex.MODAL};

  width: 500px;
  min-height: 280px;
  padding: 20px 30px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.WHITE};
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;

  transform: translate(-50%, -50%);
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;

  border-bottom: ${({ theme }) => `1px solid ${theme.color.GRAY300}`};
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  margin-top: 20px;
  row-gap: 36px;

  & > label {
    display: flex;
    flex-direction: column;
    align-items: center;

    row-gap: 36px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;

  column-gap: 10px;
  margin-left: auto;
`;

export const exitButton = css`
  display: flex;
  align-items: center;

  padding: 8px;
  gap: 2px;
  margin: 0 auto;
`;

export const strongContent = css`
  text-decoration: underline;
`;

export const closeButton = css`
  width: 22px;
  height: 38px;
  padding: 8px 0;

  margin-left: auto;
`;

export const cancelButton = css`
  width: 90px;

  background-color: ${({ theme }) => theme.color.GRAY500};
`;

export const exitConfirmButton = css`
  width: 90px;

  background-color: ${({ theme }) => theme.color.RED};
`;

export const teamNameInput = css`
  padding: 0 10px;

  font-size: 16px;

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.GRAY400};
`;
