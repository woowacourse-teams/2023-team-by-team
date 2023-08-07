import { useNavigate } from 'react-router-dom';
import Button from '~/components/common/Button/Button';
import { PATH_NAME } from '~/constants/routes';

const LandingPage = () => {
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(PATH_NAME.TEAM_SELECT);
  };

  return (
    <>
      <div>랜딩페이지입니다.</div>
      <Button onClick={handleNavigateClick}>팀바팀 이동하기</Button>
    </>
  );
};

export default LandingPage;
