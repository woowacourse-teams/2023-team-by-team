import { http } from '~/apis/http';

export const BASE_URL = `https://dev.teamby.team`;

export const sendGoogleLogin = () => {
  return http.post(`/api/auth/oauth/google/login`, {});
};
