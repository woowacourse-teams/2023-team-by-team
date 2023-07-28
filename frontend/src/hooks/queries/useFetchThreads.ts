import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchThreads } from '~/apis/feed';

export const useFetchThreads = (teamPlaceId: number) => {
  const { data, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['threads', teamPlaceId],
    ({ pageParam }) => fetchThreads(teamPlaceId, pageParam),
  );

  return {
    data,
    hasNextPage,
    isFetchingNextPage,
  };
};
