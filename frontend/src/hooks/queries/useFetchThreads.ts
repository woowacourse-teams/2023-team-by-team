import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchThreads } from '~/apis/feed';
import { THREAD_SIZE } from '~/constants/feed';

export const useFetchThreads = (teamPlaceId: number) => {
  const {
    data: threadPages,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['threadData', teamPlaceId],
    ({ pageParam = undefined }) => fetchThreads(teamPlaceId, pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.threads.length !== THREAD_SIZE) return undefined;
        return lastPage.threads[THREAD_SIZE - 1].id;
      },
      enabled: teamPlaceId > 0,
    },
  );

  return { threadPages, hasNextPage, fetchNextPage };
};
