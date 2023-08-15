import { useQuery } from '@tanstack/react-query';
import { fetchNoticeThread } from '~/apis/feed';

export const useFetchNoticeThread = (teamPlaceId: number) => {
  const { data: noticeThread } = useQuery(
    ['noticeThread', teamPlaceId],
    () => fetchNoticeThread(teamPlaceId),
    {
      enabled: teamPlaceId > 0,
    },
  );

  if (noticeThread === undefined) return {};

  return { noticeThread };
};
