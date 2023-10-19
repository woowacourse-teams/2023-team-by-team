import { useMutation } from '@tanstack/react-query';
import { sendThread } from '~/apis/feed';
import type { ThreadContent } from '~/types/feed';

export const useSendThread = (teamPlaceId: number) => {
  const { mutate, isLoading } = useMutation((threadContent: ThreadContent) => {
    const { content, images } = threadContent;
    const formData = new FormData();

    formData.append('content', content);
    images.forEach((image) => formData.append('images', image));

    return sendThread(teamPlaceId, formData);
  });

  return { mutateSendThread: mutate, isSendThreadLoading: isLoading };
};
