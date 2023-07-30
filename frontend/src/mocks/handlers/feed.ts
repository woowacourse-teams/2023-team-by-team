import { rest } from 'msw';
import { threads as threadData } from '~/mocks/fixtures/threads';

const threads = [...threadData];

export const feedHandlers = [
  //팀피드 스레드 조회
  rest.get(
    `/api/team-place/:teamPlaceId/feed/threads`,
    async (req, res, ctx) => {
      const lastThreadId = Number(req.url.searchParams.get('last-thread-id'));
      const size = Number(req.url.searchParams.get('size'));

      console.log('last' + lastThreadId);
      let index = threads.findIndex((thread) => thread.id === lastThreadId);

      if (index === -1) index = 0;

      return res(
        ctx.status(200),
        ctx.json({
          threads: threads.slice(index, index + size),
        }),
      );
    },
  ),
];
