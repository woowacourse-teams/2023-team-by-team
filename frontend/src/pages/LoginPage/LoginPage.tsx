import { useSearchParams, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const accessToken = params.get('accessToken');

  if (!accessToken) {
    alert('로그인이 필요합니다.');
    navigate('/');

    return <></>;
  }

  localStorage.setItem('accessToken', accessToken);
  navigate('/team');

  return <></>;
};

export default LoginPage;
