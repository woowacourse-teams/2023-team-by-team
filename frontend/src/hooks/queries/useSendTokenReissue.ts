import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendTokenReissue } from '~/apis/auth';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';

export const useSendTokenReissue = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(sendTokenReissue, {
    onSuccess: (data) => {
      const accessToken = data.headers.get('Authorization');
      const refreshToken = data.headers.get('Authorization-Refresh');

      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken ?? '');
      localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken ?? '');

      queryClient.invalidateQueries();
    },
    onError: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

      window.location.href = PATH_NAME.LANDING;
    },
  });

  return { mutateSendTokenReissue: mutate };
};
