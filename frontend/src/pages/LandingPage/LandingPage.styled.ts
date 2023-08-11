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
  justify-content: right;
  align-items: center;
  flex-grow: 1;
`;

export const Main = styled.main`
  display: flex;
  justify-content: right;
  flex-direction: column;

  width: 750px;
  padding-right: 50px;

  & h2,
  & p {
    text-align: right;
  }
`;

export const Header = styled.header`
  height: 64px;
  padding: 8px;
`;

export const LandingPageLink = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

export const GoogleLoginButtonWrapper = styled.div`
  &:hover button {
    box-shadow: 0 18px 20px ${({ theme }) => theme.color.GRAY300};

    transform: translateY(-6px);
  }
`;

export const GoogleLogo = styled.img`
  width: 26px;
`;

export const headerTitle = css`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.color.PRIMARY};
  text-align: right;
`;

export const mainPrefix = css`
  font-size: 60px;
  font-weight: 900;
  color: ${({ theme }) => theme.color.BLUE700};
`;

export const mainTitle = css`
  margin-bottom: 30px;

  font-size: 76px;
  font-weight: 900;
  color: ${({ theme }) => theme.color.PURPLE};
`;

export const mainLore = css`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.BLACK};
`;

export const googleLoginButton = css`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 300px;
  height: 60px;
  margin: 80px 0 0 auto;

  border: 1px solid ${({ theme }) => theme.color.GRAY300};
  border-radius: 12px;

  box-shadow: 0 12px 20px ${({ theme }) => theme.color.GRAY300};
  transition: 0.2s;
`;

export const googleLoginText = css`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.GRAY700};
`;
