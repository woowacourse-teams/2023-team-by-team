import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';
import { TeamPlaceProvider } from '~/contexts/TeamPlaceContext';
import { useSendTokenReissue } from '~/hooks/queries/useSendTokenReissue';

const ProtectRoute = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateSendTokenReissue } = useSendTokenReissue();

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    if (!accessToken) {
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
      alert('로그인이 필요합니다.');
      navigate(PATH_NAME.LANDING);
    }
  }, []);

  const resetAccessToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

    window.location.href = PATH_NAME.LANDING;
  };

  const onError = async (error: unknown) => {
    const response = error as Response;
    if (response.status === 401) {
      const data = await response.json();

      if (data.error === 'EXPIRED_ACCESS_TOKEN') {
        mutateSendTokenReissue();
        return;
      }
      resetAccessToken();
      throw new Error('유효한 사용자 정보가 아닙니다.');
    }

    if (response.status === 403) {
      localStorage.removeItem(LOCAL_STORAGE_KEY.TEAM_PLACE_ID);
      navigate(PATH_NAME.TEAM_SELECT);
    }
  };

  queryClient.setDefaultOptions({
    queries: {
      retry: false,
      onError,
    },
    mutations: {
      onError,
    },
  });

  return (
    <TeamPlaceProvider>
      <Outlet />
    </TeamPlaceProvider>
  );
};

export default ProtectRoute;
