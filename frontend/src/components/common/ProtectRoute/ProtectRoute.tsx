import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';
import { TeamPlaceProvider } from '~/contexts/TeamPlaceContext';

const ProtectRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    if (!accessToken) {
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      alert('로그인이 필요합니다.');
      navigate(PATH_NAME.LANDING);
    }
  }, []);

  return (
    <TeamPlaceProvider>
      <Outlet />
    </TeamPlaceProvider>
  );
};

export default ProtectRoute;
