import { http, HttpResponse } from 'msw';
import type { UserInfo } from '~/types/team';

const user = {
  id: 1,
  name: '홍길동홍길동홍길동홍길동',
  profileImageUrl: 'https://avatars.githubusercontent.com/u/49154600?v=4',
  email: 'test@gmail.com',
};

export const userHandlers = [
  // 사용자 정보 조회
  http.get('/api/me', () => {
    return HttpResponse.json(user);
  }),

  // 사용자 정보 수정
  http.patch<never, Pick<UserInfo, 'name'>>('/api/me', async ({ request }) => {
    const { name } = await request.json();

    if (typeof name !== 'string') {
      return new HttpResponse(null, { status: 400 });
    }

    user['name'] = name;

    return HttpResponse.json(user);
  }),

  http.delete('/api/me/account', async () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
