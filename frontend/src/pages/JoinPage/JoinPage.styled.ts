import { css, styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
`;

export const MainContainer = styled.main<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  overflow-x: hidden;

  width: 100%;
  height: 100%;

  ${({ $isMobile }) => {
    if ($isMobile)
      return css`
        justify-content: center;
      `;

    return css`
      justify-content: flex-end;
      padding-right: 120px;
    `;
  }}
`;

export const InnerContainer = styled.div<{ $isLinkClicked: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 340px;
  height: 380px;

  animation: ${({ theme, $isLinkClicked }) =>
      $isLinkClicked ? theme.animation.slideRight : theme.animation.slideLeft}
    0.6s ease-in-out forwards;
`;

export const InviteCodeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  height: 70px;

  border-radius: 14px;

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ConfirmButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HelpTextContainer = styled.div<{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      padding: 4px 10px;
      width: fit-content;

      border-radius: 6px;
      background-color: ${({ theme }) => theme.color.WHITE_BLUR};
    `}
`;

export const createPageButton = css`
  padding: 0;

  border-bottom: 1px solid ${({ theme }) => theme.color.PRIMARY};

  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.PRIMARY};

  &:hover {
    opacity: 0.6;
  }
`;

export const explainText = css`
  margin-right: 10px;

  color: ${({ theme }) => theme.color.GRAY600};
`;

export const titleText = ($isMobile: boolean) => css`
  display: flex;
  justify-content: center;

  width: 100%;

  border-bottom: 1px solid ${({ theme }) => theme.color.PRIMARY};

  font-size: 32px;
  color: ${({ theme }) => theme.color.PRIMARY};

  ${$isMobile &&
  css`
    padding: 6px 10px;
    border-radius: 8px 8px 0 0;
    background-color: ${({ theme }) => theme.color.WHITE_BLUR};
  `}
`;

export const inputTitle = css`
  padding: 10px 20px;

  border: none;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.color.WHITE};

  font-size: 24px;
`;

export const submitButton = css`
  display: flex;
  justify-content: center;
  align-self: flex-end;

  width: 100px;

  border-radius: 10px;
`;

export const warningText = css`
  height: 16px;

  color: ${({ theme }) => theme.color.RED};
`;
