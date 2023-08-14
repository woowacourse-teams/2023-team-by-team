import { css, styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
`;

export const MainContainer = styled.main`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow-x: hidden;

  width: 100%;
  height: 100%;
  padding-right: 120px;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 340px;
  height: 380px;

  animation: ${({ theme }) => theme.animation.slideLeft} 0.6s ease-in-out
    forwards;
`;

export const TeamNameForm = styled.form`
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

export const explainText = css`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.color.GRAY600};
`;

export const titleText = css`
  display: flex;
  justify-content: center;

  width: 100%;

  font-size: 32px;
  color: ${({ theme }) => theme.color.PRIMARY};

  border-bottom: 1px solid ${({ theme }) => theme.color.PRIMARY};
`;

export const inputTitle = css`
  padding: 10px 20px;

  border: none;
  border-radius: 14px;
  background-color: transparent;

  font-size: 24px;
`;

export const submitButton = css`
  display: flex;
  justify-content: center;
  align-self: flex-end;

  width: 100px;
  border-radius: 10px;
`;
