import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGoogleLogin } from '~/apis/auth';
import { PATH_NAME } from '~/constants/routes';
import * as S from './LandingPage.styled';
import Button from '~/components/common/Button/Button';
import IntroCardPile from '~/components/landing/IntroCardPile/IntroCardPile';
import Text from '~/components/common/Text/Text';
import { googleLogo } from '~/assets/png';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import LandingHeader from '~/components/common/LandingHeader/LandingHeader';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const { googleLoginUrl } = await fetchGoogleLogin();

    window.location.href = googleLoginUrl;
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const teamPlaceId = localStorage.getItem(LOCAL_STORAGE_KEY.TEAM_PLACE_ID);

    if (accessToken && teamPlaceId) {
      navigate(PATH_NAME.TEAM_SELECT);
      return;
    }

    if (accessToken) {
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      return;
    }
  }, [navigate]);

  return (
    <S.Container>
      <LandingHeader href={PATH_NAME.LANDING} ariaLabel="랜딩 페이지로" />
      <S.MainContainer>
        <S.Main>
          <Text as="h2" css={S.mainPrefix}>
            쉽고 간단한 팀플 플랫폼,
          </Text>
          <Text as="h2" css={S.mainTitle}>
            팀바팀
          </Text>
          <S.LoreTextContainer>
            <Text css={S.mainLore}>팀 프로젝트의 모든 것을</Text>
            <Text css={S.mainLore}>팀바팀으로 관리해보세요.</Text>
          </S.LoreTextContainer>
          <Button
            type="button"
            variant="plain"
            css={S.googleLoginButton}
            onClick={handleGoogleLogin}
          >
            <S.GoogleLoginButtonAppearance>
              <S.GoogleLogo src={googleLogo} />
              <Text css={S.googleLoginText}>Google 계정으로 로그인하기</Text>
            </S.GoogleLoginButtonAppearance>
          </Button>
        </S.Main>
      </S.MainContainer>
      <IntroCardPile />
    </S.Container>
  );
};

export default LandingPage;
