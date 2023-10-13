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
      const teamPlaceId = Number(req.params.teamPlaceId);
      const bufferData = await req.arrayBuffer();

      // formData를 추출
      const formData = new TextDecoder('utf-8').decode(bufferData);

      const imageCount = formData
        .split('\r\n')
        .filter((line) =>
          line.startsWith('Content-Disposition: form-data; name="images"'),
        ).length;

      const contentValue = formData
        .split('Content-Disposition: form-data; name="content"\r\n\r\n')[1]
        .split('\r\n------WebKitFormBoundary')[0];

      const newThread = {
        id: Date.now(),
        type: 'thread',
        authorId: 1,
        authorName: '유스',
        isMe: true,
        profileImageUrl: 'https://avatars.githubusercontent.com/u/49154600?v=4',
        createdAt: '2023-08-01 12:00' as YYYYMMDDHHMM,
        content: contentValue,
        images: Array.from({ length: imageCount }).map((_, index) => ({
          id: index,
          isExpired: false,
          name: '목데이터',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
        })),
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
      const teamPlaceId = Number(req.params.teamPlaceId);
      const bufferData = await req.arrayBuffer();

      // formData를 추출
      const formData = new TextDecoder('utf-8').decode(bufferData);
      const imageCount = formData
        .split('\r\n')
        .filter((line) =>
          line.startsWith('Content-Disposition: form-data; name="images"'),
        ).length;

      const contentValue = formData
        .split('Content-Disposition: form-data; name="content"\r\n\r\n')[1]
        .split('\r\n------WebKitFormBoundary')[0];

      const newNoticeThread = {
        id: Date.now(),
        type: 'thread',
        authorId: 1,
        authorName: '유스',
        isMe: true,
        profileImageUrl: 'https://avatars.githubusercontent.com/u/49154600?v=4',
        createdAt: '2023-08-01 12:00' as YYYYMMDDHHMM,
        content: contentValue,
        images: Array.from({ length: imageCount }).map((_, index) => ({
          id: index,
          isExpired: false,
          name: '목데이터',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
        })),
      };

      noticeThread.id = newNoticeThread.id;
      noticeThread.authorId = newNoticeThread.authorId;
      noticeThread.authorName = newNoticeThread.authorName;
      noticeThread.profileImageUrl = newNoticeThread.profileImageUrl;
      noticeThread.createdAt = newNoticeThread.createdAt;
      noticeThread.content = newNoticeThread.content;
      noticeThread.images = newNoticeThread.images;

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
