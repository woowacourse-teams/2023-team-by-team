import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchThreads } from '~/apis/feed';
import { THREAD_SIZE } from '~/constants/feed';
import { STALE_TIME } from '~/constants/query';

export const useFetchThreads = (teamPlaceId: number) => {
  const {
    data: threadPages,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['threadData', teamPlaceId],
    ({ pageParam = undefined }) => fetchThreads(teamPlaceId, pageParam),
    {
      enabled: teamPlaceId > 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.threads.length !== THREAD_SIZE) return undefined;
        return lastPage.threads[THREAD_SIZE - 1].id;
      },
      staleTime: STALE_TIME.TEAM_FEED,
    },
  );

  return { threadPages, hasNextPage, fetchNextPage };
};
