import { useNavigate } from 'react-router-dom';
import Button from '~/components/common/Button/Button';
import { PATH_NAME } from '~/constants/routes';
import * as S from './LandingPage.styled';
import { sendGoogleLogin } from '~/apis/auth';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const response = await sendGoogleLogin();

    console.log(response);
  };

  const handleNavigateClick = () => {
    navigate(PATH_NAME.TEAM_SELECT);
  };

  return (
    <S.Container>
      <Button onClick={handleGoogleLogin}>구글 로그인</Button>
      <Button onClick={handleNavigateClick}>팀바팀 이동하기</Button>
    </S.Container>
  );
};

export default LandingPage;
