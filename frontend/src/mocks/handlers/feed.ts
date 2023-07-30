import { rest } from 'msw';
import { threads as threadData } from '~/mocks/fixtures/threads';

const threads = [...threadData];

export const feedHandlers = [
  //팀피드 스레드 조회
  rest.get(
    `/api/team-place/:teamPlaceId/feed/threads`,
    async (req, res, ctx) => {
      const lastThreadId = Number(req.url.searchParams.get('lastThreadId'));
      const size = Number(req.url.searchParams.get('size'));

      if (!lastThreadId)
        return res(
          ctx.status(200),
          ctx.json({
            threads: threads.slice(0, size),
          }),
        );

      const index = threads.findIndex((thread) => thread.id === lastThreadId);
      if (index === -1) return res(ctx.status(404));

      return res(
        ctx.status(200),
        ctx.json({
          threads: threads.slice(index + 1, index + size),
        }),
      );
    },
  ),
];
