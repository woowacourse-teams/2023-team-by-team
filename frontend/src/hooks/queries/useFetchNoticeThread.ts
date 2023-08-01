import { useQuery } from '@tanstack/react-query';
import { fetchNoticeThread } from '~/apis/feed';

export const useFetchNoticeThread = (teamPlaceId: number) => {
  const { data } = useQuery(['noticeThread'], () =>
    fetchNoticeThread(teamPlaceId),
  );

  if (data === undefined) return {};

  const { noticeThread } = data;

  return { noticeThread };
};
