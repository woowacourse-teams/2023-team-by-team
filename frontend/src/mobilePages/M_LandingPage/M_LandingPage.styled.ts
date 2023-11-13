import { styled, css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const Main = styled.main`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  width: 80vw;
  height: 80vh;

  & h2,
  & p {
    text-align: right;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

export const LandingPageLink = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

export const LoreTextContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  margin-bottom: 60px;
`;

export const GoogleLoginButtonAppearance = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 300px;
  height: 60px;

  border: 1px solid ${({ theme }) => theme.color.GRAY300};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.WHITE};

  box-shadow: 0 12px 20px ${({ theme }) => theme.color.GRAY300};
  transition: 0.25s;

  button &:hover {
    transform: translateY(-6px);
  }
`;

export const GoogleLogo = styled.img`
  width: 26px;
  height: 27px;
`;

export const mainPrefix = css`
  width: fit-content;

  font-size: 30px;
  font-weight: 900;

  color: ${({ theme }) => theme.color.BLUE700};
  background-color: ${({ theme }) => theme.color.WHITE_BLUR};
  border-radius: 4px;
`;

export const mainTitle = css`
  width: fit-content;
  margin-bottom: 30px;

  font-size: 50px;
  font-weight: 900;

  color: ${({ theme }) => theme.color.PURPLE};
  background-color: ${({ theme }) => theme.color.WHITE_BLUR};
  border-radius: 4px;
`;

export const mainLore = css`
  width: fit-content;

  font-size: 20px;
  font-weight: 600;

  color: ${({ theme }) => theme.color.BLACK};
  background-color: ${({ theme }) => theme.color.WHITE_BLUR};
  border-radius: 4px;
`;

export const googleLoginButton = css`
  display: flex;
  flex-direction: column;
  justify-content: end;

  width: 300px;
  height: 66px;
  margin-left: auto;
  padding: 0;
`;

export const googleLoginText = css`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.GRAY700};
`;
