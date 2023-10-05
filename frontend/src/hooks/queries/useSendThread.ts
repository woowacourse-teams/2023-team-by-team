import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendThread } from '~/apis/feed';
import type { ThreadContent } from '~/types/feed';

export const useSendThread = (teamPlaceId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (threadContent: ThreadContent) => {
      const { content, images } = threadContent;
      const formData = new FormData();
      formData.append('content', content);
      images.forEach((image) => formData.append('images', image));

      return sendThread(teamPlaceId, formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['threadData', teamPlaceId]);
      },
    },
  );

  return { mutateSendThread: mutate };
};
