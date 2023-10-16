import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '~/hooks/useToast';
import { baseUrl } from '~/apis/http';
import { EventSourcePolyfill } from 'event-source-polyfill';

export const useSSE = (teamPlaceId: number) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      baseUrl + `/api/team-place/${teamPlaceId}/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );

    eventSource.onmessage = (event: MessageEvent) => {
      const parsedData = JSON.parse(event.data);

      showToast('success', parsedData);
    };

    eventSource.onerror = () => {
      showToast('error', '서버와 연결이 끊어졌습니다. 다시 시도해주세요.');
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient, teamPlaceId]);
};
