import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendThread } from '~/apis/feed';
import type { ThreadContent } from '~/types/feed';

export const useSendThread = (teamPlaceId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (body: ThreadContent) => sendThread(teamPlaceId, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['threadData', teamPlaceId]);
      },
    },
  );

  return { mutateSendThread: mutate };
};
