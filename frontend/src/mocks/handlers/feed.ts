import { rest } from 'msw';
import { threads as threadData } from '~/mocks/fixtures/threads';
import { noticeThread as noticeData } from '~/mocks/fixtures/threads';

const threads = [...threadData];
const noticeThread = { ...noticeData };

export const feedHandlers = [
  //팀피드 스레드 조회
  rest.get(
    '/api/team-place/:teamPlaceId/feed/threads',
    async (req, res, ctx) => {
      const lastThreadId = Number(req.url.searchParams.get('last-thread-id'));
      const size = Number(req.url.searchParams.get('size'));

      const index = threads.findIndex((thread) => thread.id === lastThreadId);

      return res(
        ctx.status(200),
        ctx.json({
          threads: threads.slice(index + 1, index + size + 1),
        }),
      );
    },
  ),

  //팀피드 공지 스레드 조회
  rest.get(
    '/api/team-place/:teamPlaceId/feed/notice/recent',
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(noticeThread));
    },
  ),
];
