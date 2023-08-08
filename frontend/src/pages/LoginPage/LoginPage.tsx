import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PATH_NAME } from '~/constants/routes';

const LoginPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const accessToken = params.get('accessToken');

  useEffect(() => {
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      navigate(PATH_NAME.LANDING);

      return;
    }

    localStorage.setItem('accessToken', accessToken);
    navigate(PATH_NAME.TEAM_SELECT);
  }, []);

  return <></>;
};

export default LoginPage;
