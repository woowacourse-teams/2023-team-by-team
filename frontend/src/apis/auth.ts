import { baseUrl, http } from '~/apis/http';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';

let reissuePromise: Promise<Response> | null = null;
interface GoogleLoginResponse {
  googleLoginUrl: string;
}

export const fetchGoogleLogin = () => {
  return http.get<GoogleLoginResponse>(`/api/auth/oauth/google/login`);
};

export const sendTokenReissue = async () => {
  if (reissuePromise !== null) {
    return reissuePromise;
  }

  const BASE_URL = baseUrl === undefined ? '' : baseUrl;

  reissuePromise = fetch(BASE_URL + '/api/token/reissue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization-Refresh': `Bearer ${localStorage.getItem(
        LOCAL_STORAGE_KEY.REFRESH_TOKEN,
      )}`,
    },
  });

  const response = await reissuePromise;
  reissuePromise = null;

  if (!response.ok) {
    throw new Error('네트워크 통신 중 에러가 발생했습니다.');
  }

  return response;
};
