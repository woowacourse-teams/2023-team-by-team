import { styled, css } from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;

  width: 490px;
  max-width: 100%;
  padding: 24px;
  row-gap: 24px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.WHITE};

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;

  transform: translate(-50%, -50%);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 38px;

  border-bottom: ${({ theme }) => `1px solid ${theme.color.GRAY300}`};
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export const WarningBox = styled.div`
  padding: 16px;

  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.GRAY100};

  & ul > li {
    margin: 0 0 6px 16px;

    list-style: initial;
  }

  & ul > li::marker {
    color: ${({ theme }) => theme.color.GRAY700};
  }
`;

export const Username = styled.span`
  color: ${({ theme }) => theme.color.PRIMARY};
`;

export const AccountDeleteForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const closeButton = css`
  width: 32px;
  height: 38px;
  padding: 0;
`;

export const deleteConfirmInput = css`
  padding: 0 10px;

  font-size: 16px;

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.GRAY400};
`;

export const accountDeleteButton = css`
  width: 100%;

  background-color: ${({ theme }) => theme.color.RED};
`;
