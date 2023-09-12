import { rest } from 'msw';

const user = {
  id: 1,
  name: '홍길동홍길동홍길동홍길동',
  profileImageUrl: 'https://avatars.githubusercontent.com/u/49154600?v=4',
  email: 'test@gmail.com',
};

export const userHandlers = [
  // 사용자 정보 조회
  rest.get('/api/me', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  // 사용자 정보 수정
  rest.patch('/api/me', async (req, res, ctx) => {
    const { name } = await req.json();

    if (typeof name !== 'string') {
      return res(ctx.status(400));
    }

    user['name'] = name;

    return res(ctx.status(200), ctx.json(user));
  }),
];
