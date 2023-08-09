import { css, styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100vw;
  height: 100vh;
  padding-right: 120px;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 340px;
  height: 460px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

export const explainText = css`
  color: ${({ theme }) => theme.color.GRAY600};
`;

export const startTeamButton = (variant?: 'normal') => css`
  width: 100%;
  height: 70px;
  padding: 16px 80px;

  border-radius: 14px;

  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => variant === 'normal' && theme.color.PRIMARY};

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
`;
