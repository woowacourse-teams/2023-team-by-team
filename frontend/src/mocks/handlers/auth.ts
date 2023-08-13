import { rest } from 'msw';

export const authHandlers = [
  rest.get('/api/me', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: '홍길동',
        profileImageUrl: 'https://avatars.githubusercontent.com/u/49154600?v=4',
        email: 'test@gmail.com',
      }),
    );
  }),
];
