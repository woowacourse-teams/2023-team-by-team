import { http } from '~/apis/http';

export const fetchGoogleLogin = () => {
  return http.get<{ googleLoginUrl: string }>(`/api/auth/oauth/google/login`);
};
