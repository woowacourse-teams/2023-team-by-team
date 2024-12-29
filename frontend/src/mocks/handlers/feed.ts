import { delay, http, HttpResponse } from 'msw';
import { threads as threadData } from '~/mocks/fixtures/threads';
import { noticeThread as noticeData } from '~/mocks/fixtures/threads';
import { teamPlaces } from '~/mocks/fixtures/team';

import type { YYYYMMDDHHMM } from '~/types/schedule';

const threads = [...threadData];
const noticeThread = { ...noticeData };

export const feedHandlers = [
  //팀채팅 채팅 조회
  http.get(
    '/api/team-place/:teamPlaceId/feed/threads',
    async ({ request, params }) => {
      const url = new URL(request.url);
      const lastThreadId = Number(url.searchParams.get('last-thread-id'));
      const size = Number(url.searchParams.get('size'));
      const teamPlaceId = Number(params.teamPlaceId);
      const teamIndex = teamPlaces.findIndex(
        (teamPlace) => teamPlace.id === teamPlaceId,
      );

      if (teamIndex === -1) return new HttpResponse(null, { status: 403 });

      const index = threads.findIndex((thread) => thread.id === lastThreadId);

      return HttpResponse.json({
        threads: threads.slice(index + 1, index + size + 1),
      });
    },
  ),

  //팀피드 공지 조회
  http.get(
    '/api/team-place/:teamPlaceId/feed/notice/recent',
    async ({ params }) => {
      const teamPlaceId = Number(params.teamPlaceId);
      const teamIndex = teamPlaces.findIndex(
        (teamPlace) => teamPlace.id === teamPlaceId,
      );

      if (teamIndex === -1) return new HttpResponse(null, { status: 403 });

      return HttpResponse.json(noticeThread);
    },
  ),

  //팀피드 채팅 생성
  http.post(
    '/api/team-place/:teamPlaceId/feed/threads',
    async ({ request, params }) => {
      const teamPlaceId = Number(params.teamPlaceId);
      const bufferData = await request.arrayBuffer();

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

      if (imageCount !== 0) {
        await delay(2000);

        return new HttpResponse(null, {
          status: 201,
          headers: {
            Location: `/api/team-place/${teamPlaceId}/feed/threads/${newThread.id}`,
          },
        });
      }

      return new HttpResponse(null, {
        status: 201,
        headers: {
          Location: `/api/team-place/${teamPlaceId}/feed/threads/${newThread.id}`,
        },
      });
    },
  ),

  //팀피드 공지 채팅 생성
  http.post(
    '/api/team-place/:teamPlaceId/feed/notice',
    async ({ request, params }) => {
      const teamPlaceId = Number(params.teamPlaceId);
      const bufferData = await request.arrayBuffer();

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

      if (imageCount !== 0) {
        await delay(2000);

        return new HttpResponse(null, {
          status: 201,
          headers: {
            Location: `/api/team-place/${teamPlaceId}/feed/threads/notice/${newNoticeThread.id}`,
          },
        });
      }

      return new HttpResponse(null, {
        status: 201,
        headers: {
          Location: `/api/team-place/${teamPlaceId}/feed/threads/notice/${newNoticeThread.id}`,
        },
      });
    },
  ),
];
