import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchThreads } from '~/apis/feed';
import { THREAD_SIZE, THREAD_TYPE } from '~/constants/feed';

export const useFetchNotifications = (teamPlaceId: number) => {
  const {
    data: notificationPages,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['threadData', teamPlaceId],
    ({ pageParam = undefined }) => fetchThreads(teamPlaceId, pageParam),
    {
      enabled: teamPlaceId > 0,
      select: (data) => ({
        pages: data.pages.map((page) => {
          const { threads } = page;
          const notifications = threads.filter(
            (thread) => thread.type === THREAD_TYPE.NOTIFICATION,
          );

          return {
            ...page,
            threads: notifications,
          };
        }),
        pageParams: data.pageParams,
      }),
      getNextPageParam: (lastPage) => {
        if (lastPage.threads.length !== THREAD_SIZE) return undefined;
        return lastPage.threads[THREAD_SIZE - 1].id;
      },
    },
  );

  return { notificationPages, hasNextPage, fetchNextPage };
};
