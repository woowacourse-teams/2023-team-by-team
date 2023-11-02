import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';
import { useSSE } from '~/hooks/queries/useSSE';
import { useSendTokenReissue } from '~/hooks/queries/useSendTokenReissue';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useToken } from '~/hooks/useToken';

const ProtectRoute = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { accessToken, resetToken } = useToken();
  const { mutateSendTokenReissue } = useSendTokenReissue();
  const { teamPlaceId } = useTeamPlace();

  useSSE(teamPlaceId);

  const resetAccessToken = () => {
    resetToken();

    window.location.href = PATH_NAME.LANDING;
  };

  const onError = async (errorResponse: unknown) => {
    if (!(errorResponse instanceof Response)) {
      return;
    }

    const { status } = errorResponse;

    if (status === 401) {
      const data = await errorResponse.json();

      if (data.error === 'EXPIRED_ACCESS_TOKEN') {
        mutateSendTokenReissue();
        return;
      }

      resetAccessToken();
      throw new Error('유효한 사용자 정보가 아닙니다.');
    }

    if (status === 403) {
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

  useEffect(() => {
    if (!accessToken) {
      resetToken();
      alert('로그인이 필요합니다.');
      navigate(PATH_NAME.LANDING);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
};

export default ProtectRoute;
