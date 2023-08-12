import { http } from '~/apis/http';

export const fetchGoogleLogin = () => {
  return http.get<{ googleLoginUrl: string }>(`/api/auth/oauth/google/login`);
};

export const fetchUserInfo = () => {
  return http.get<{
    id: number;
    name: string;
    profileImageUrl: string;
    email: string;
  }>('/api/me');
};
