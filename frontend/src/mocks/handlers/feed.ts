import { rest } from 'msw';
import { threads as threadData } from '~/mocks/fixtures/threads';
import { noticeThread as noticeData } from '~/mocks/fixtures/threads';
import { teamPlaces } from '~/mocks/fixtures/team';

import type { YYYYMMDDHHMM } from '~/types/schedule';

const threads = [...threadData];
const noticeThread = { ...noticeData };

export const feedHandlers = [
  //팀피드 스레드 조회
  rest.get(
    '/api/team-place/:teamPlaceId/feed/threads',
    async (req, res, ctx) => {
      const lastThreadId = Number(req.url.searchParams.get('last-thread-id'));
      const size = Number(req.url.searchParams.get('size'));
      const teamPlaceId = Number(req.params.teamPlaceId);
      const teamIndex = teamPlaces.findIndex(
        (teamPlace) => teamPlace.id === teamPlaceId,
      );

      if (teamIndex === -1) return res(ctx.status(403));

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
      const teamPlaceId = Number(req.params.teamPlaceId);
      const teamIndex = teamPlaces.findIndex(
        (teamPlace) => teamPlace.id === teamPlaceId,
      );

      if (teamIndex === -1) return res(ctx.status(403));

      return res(ctx.status(200), ctx.json(noticeThread));
    },
  ),

  //팀피드 스레드 생성
  rest.post(
    '/api/team-place/:teamPlaceId/feed/threads',
    async (req, res, ctx) => {
      const { content } = await req.json();
      const teamPlaceId = Number(req.params.teamPlaceId);

      if (typeof content !== 'string') return res(ctx.status(400));

      const newThread = {
        id: Date.now(),
        type: 'thread',
        authorId: 1,
        authorName: '유스',
        isMe: true,
        profileImageUrl: 'https://avatars.githubusercontent.com/u/49154600?v=4',
        createdAt: '2023-08-01 12:00' as YYYYMMDDHHMM,
        content,
        images: [],
      };

      threads.unshift(newThread);

      return res(
        ctx.status(201),
        ctx.set(
          'Location',
          `/api/team-place/${teamPlaceId}/feed/threads/${newThread.id}`,
        ),
      );
    },
  ),

  //팀피드 공지 스레드 생성
  rest.post(
    '/api/team-place/:teamPlaceId/feed/notice',
    async (req, res, ctx) => {
      const { content } = await req.json();
      const teamPlaceId = Number(req.params.teamPlaceId);

      if (typeof content !== 'string') return res(ctx.status(400));

      const newNoticeThread = {
        id: Date.now(),
        authorId: 1,
        authorName: '유스',
        profileImageUrl: 'https://avatars.githubusercontent.com/u/49154600?v=4',
        createdAt: '2023-08-01 12:00' as YYYYMMDDHHMM,
        content,
      };

      noticeThread.id = newNoticeThread.id;
      noticeThread.authorId = newNoticeThread.authorId;
      noticeThread.authorName = newNoticeThread.authorName;
      noticeThread.profileImageUrl = newNoticeThread.profileImageUrl;
      noticeThread.createdAt = newNoticeThread.createdAt;
      noticeThread.content = newNoticeThread.content;

      return res(
        ctx.status(201),
        ctx.set(
          'Location',
          `/api/team-place/${teamPlaceId}/feed/threads/notice/${newNoticeThread.id}`,
        ),
      );
    },
  ),
];
