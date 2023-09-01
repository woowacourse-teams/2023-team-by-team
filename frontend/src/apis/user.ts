import { http } from '~/apis/http';
import type { UserInfo } from '~/types/team';

export const modifyUserInfo = (body: Pick<UserInfo, 'name'>) => {
  return http.patch('/api/me', body);
};
