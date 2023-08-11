import { useNavigate } from 'react-router-dom';
import Button from '~/components/common/Button/Button';
import { PATH_NAME } from '~/constants/routes';
import * as S from './LandingPage.styled';
import { fetchGoogleLogin } from '~/apis/auth';
import { useEffect } from 'react';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const { googleLoginUrl } = await fetchGoogleLogin();

    window.location.href = googleLoginUrl;
  };

  const handleNavigateClick = () => {
    navigate(PATH_NAME.TEAM_SELECT);
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
  }, []);

  return (
    <S.Container>
      <Button onClick={handleGoogleLogin}>구글 로그인</Button>
      <Button onClick={handleNavigateClick}>팀바팀 이동하기</Button>
    </S.Container>
  );
};

export default LandingPage;
