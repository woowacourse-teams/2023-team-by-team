import { http } from '~/apis/http';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';

export const fetchGoogleLogin = () => {
  return http.get<{ googleLoginUrl: string }>(`/api/auth/oauth/google/login`);
};

export const sendTokenReissue = async () => {
  const response = await fetch('/api/token/reissue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization-Refresh': `Bearer ${localStorage.getItem(
        LOCAL_STORAGE_KEY.REFRESH_TOKEN,
      )}`,
    },
  });

  if (!response.ok) {
    throw new Error('네트워크 통신 중 에러가 발생했습니다.');
  }

  return response;
};
