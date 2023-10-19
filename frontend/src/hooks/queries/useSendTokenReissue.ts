import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendTokenReissue } from '~/apis/auth';
import { PATH_NAME } from '~/constants/routes';
import { useToken } from '~/hooks/useToken';

export const useSendTokenReissue = () => {
  const queryClient = useQueryClient();
  const { updateToken, resetToken } = useToken();
  const { mutate } = useMutation(sendTokenReissue, {
    onSuccess: (data) => {
      const accessToken = data.headers.get('Authorization');
      const refreshToken = data.headers.get('Authorization-Refresh');

      updateToken(accessToken ?? '', refreshToken ?? '');

      queryClient.invalidateQueries();
    },
    onError: () => {
      resetToken();

      window.location.href = PATH_NAME.LANDING;
    },
  });

  return { mutateSendTokenReissue: mutate };
};
