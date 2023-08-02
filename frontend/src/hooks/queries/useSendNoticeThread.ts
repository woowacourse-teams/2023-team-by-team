import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendNoticeThread } from '~/apis/feed';
import type { ThreadContent } from '~/types/feed';

export const useSendNoticeThread = (teamPlaceId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (body: ThreadContent) => sendNoticeThread(teamPlaceId, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['noticeThread', teamPlaceId]);
      },
    },
  );

  return { mutateSendNoticeThread: mutate };
};
