import { http } from '~/apis/http';
import { THREAD_SIZE } from '~/constants/feed';
import type { Thread } from '~/types/feed';

export const fetchThreads = (teamPlaceId: number, lastThreadId?: number) => {
  const query = lastThreadId
    ? `last-thread-id=${lastThreadId}&size=${THREAD_SIZE}`
    : `size=${THREAD_SIZE}`;

  return http.get<{
    threads: Thread[];
  }>(`/api/team-place/${teamPlaceId}/feed/threads?${query}`);
};
