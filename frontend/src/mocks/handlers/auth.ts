import { rest } from 'msw';

export const authHandlers = [
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true');

    return res(
      // Respond with a 200 status code
      ctx.status(200),
    );
  }),

  rest.get('/me', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'Su Young',
        age: '27',
      }),
    );
  }),
];
