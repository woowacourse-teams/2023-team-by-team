import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';
import { TeamPlaceProvider } from '~/contexts/TeamPlaceContext';
import { useSendTokenReissue } from '~/hooks/queries/useSendTokenReissue';
import { useToast } from '~/hooks/useToast';

const ProtectRoute = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { mutateSendTokenReissue } = useSendTokenReissue();
  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    if (!accessToken) {
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      alert('로그인이 필요합니다.');
      navigate(PATH_NAME.LANDING);
    }
  }, []);

  const resetAccessToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    window.location.href = PATH_NAME.LANDING;
  };

  const onError = async (error: unknown) => {
    const response = error as Response;
    if (response.status === 401) {
      const data = await response.json();

      if (data.error === 'EXPIRED_ACCESS_TOKEN') {
        mutateSendTokenReissue();
        showToast(
          'error',
          '네트워크 통신에러가 발생했습니다.\n다시 시도해주세요.',
        );
        return;
      }
      resetAccessToken();
      throw new Error('유효한 사용자 정보가 아닙니다.');
    }
  };

  queryClient.setDefaultOptions({
    queries: {
      retry: 1,
      retryDelay: 0,
      onError,
    },
    mutations: {
      retry: 1,
      retryDelay: 0,
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
