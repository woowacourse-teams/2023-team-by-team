import { useMutation } from '@tanstack/react-query';
import { sendTokenReissue } from '~/apis/auth';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';

export const useSendTokenReissue = () => {
  const { mutate } = useMutation(sendTokenReissue, {
    onSuccess: (data) => {
      const accessToken = data.headers.get('Authorization');
      const refreshToken = data.headers.get('Authorization-Refresh');

      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken ?? '');
      localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken ?? '');
    },
  });

  return { mutateSendTokenReissue: mutate };
};
