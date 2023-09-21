import { http } from '~/apis/http';
import type { UserInfo } from '~/types/team';

export const fetchUserInfo = () => {
  return http.get<UserInfo>('/api/me');
};

export const modifyUserInfo = (body: Pick<UserInfo, 'name'>) => {
  return http.patch('/api/me', body);
};

export const deleteUserAccount = () => {
  return http.delete('/api/me/account');
};
