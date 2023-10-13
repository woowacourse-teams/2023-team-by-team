import { styled, css } from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.MODAL - 1};

  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: ${({ theme }) => theme.zIndex.MODAL};

  width: 490px;
  max-width: 100%;
  padding: 18px 20px 20px 20px;
  row-gap: 10px;

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
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 36px;

  border-bottom: ${({ theme }) => `1px solid ${theme.color.GRAY300}`};
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`;

export const ExplainBox = styled.div`
  padding: 10px;

  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.GRAY100};

  & ul > li::marker {
    color: ${({ theme }) => theme.color.GRAY700};
  }
`;

export const AccountBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const ContentContainer = styled.div`
  display: flex;
  column-gap: 10px;
`;

export const UrlWrapper = styled.a`
  width: 100%;
`;

export const closeButton = css`
  width: 32px;
  height: 38px;
  padding: 0;
`;

export const dangerousButton = css`
  display: flex;
  position: relative;
  align-self: flex-end;
  align-items: center;
  padding: 0px;

  cursor: pointer;
`;

export const dangerousText = css`
  color: ${({ theme }) => theme.color.RED};
`;

export const explainText = css`
  white-space: pre;
`;
