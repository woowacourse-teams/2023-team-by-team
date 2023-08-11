import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGoogleLogin } from '~/apis/auth';
import { PATH_NAME } from '~/constants/routes';
import * as S from './LandingPage.styled';
import Button from '~/components/common/Button/Button';
import IntroCardPile from '~/components/landing/IntroCardPile/IntroCardPile';
import Text from '~/components/common/Text/Text';
import { LogoIcon } from '~/assets/svg';
import { googleLogo } from '~/assets/png';

const LandingPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  const handleGoogleLogin = async () => {
    const { googleLoginUrl } = await fetchGoogleLogin();

    window.location.href = googleLoginUrl;
  };

  useEffect(() => {
    if (accessToken) {
      navigate(PATH_NAME.TEAM_SELECT);
      return;
    }
  }, [accessToken, navigate]);

  return (
    <S.Container>
      <S.Header>
        <S.LandingPageLink to={PATH_NAME.LANDING}>
          <LogoIcon />
          <Text as="h1" css={S.headerTitle}>
            팀바팀
          </Text>
        </S.LandingPageLink>
      </S.Header>
      <S.MainContainer>
        <S.Main>
          <Text as="h2" css={S.mainPrefix}>
            쉽고 간단한 팀플 플랫폼,
          </Text>
          <Text as="h2" css={S.mainTitle}>
            팀바팀
          </Text>
          <Text css={S.mainLore}>팀 프로젝트의 모든 것을</Text>
          <Text css={S.mainLore}>팀바팀으로 관리해보세요.</Text>
          <S.GoogleLoginButtonWrapper>
            <Button
              variant="plain"
              css={S.googleLoginButton}
              onClick={handleGoogleLogin}
            >
              <S.GoogleLogo src={googleLogo} alt="구글 아이콘" />
              <Text css={S.googleLoginText}>Google 계정으로 로그인하기</Text>
            </Button>
          </S.GoogleLoginButtonWrapper>
        </S.Main>
      </S.MainContainer>
      <IntroCardPile />
    </S.Container>
  );
};

export default LandingPage;
