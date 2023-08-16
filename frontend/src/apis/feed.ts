import { http } from '~/apis/http';
import { THREAD_SIZE } from '~/constants/feed';
import type { Thread, NoticeThread, ThreadContent } from '~/types/feed';

interface ThreadsResponse {
  threads: Thread[];
}

export const fetchThreads = (teamPlaceId: number, lastThreadId?: number) => {
  const query = lastThreadId
    ? `last-thread-id=${lastThreadId}&size=${THREAD_SIZE}`
    : `size=${THREAD_SIZE}`;

  return http.get<ThreadsResponse>(
    `/api/team-place/${teamPlaceId}/feed/threads?${query}`,
  );
};

export const fetchNoticeThread = (teamPlaceId: number) => {
  return http.get<NoticeThread>(
    `/api/team-place/${teamPlaceId}/feed/notice/recent`,
  );
};

export const sendThread = (teamPlaceId: number, body: ThreadContent) => {
  return http.post(`/api/team-place/${teamPlaceId}/feed/threads`, body);
};

export const sendNoticeThread = (teamPlaceId: number, body: ThreadContent) => {
  return http.post(`/api/team-place/${teamPlaceId}/feed/notice`, body);
};
