import { useEffect } from 'react';
import type { RefObject } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '~/apis/http';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';

export const useSSE = (teamPlaceId: number, ref: RefObject<HTMLDivElement>) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!teamPlaceId) {
      return;
    }

    const scrollToBottom = () => {
      if (!ref.current) {
        return;
      }

      const { scrollHeight } = ref.current;

      ref.current.scrollTop = scrollHeight;
    };

    const eventSource = new EventSourcePolyfill(
      baseUrl + `/api/team-place/${teamPlaceId}/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_KEY.ACCESS_TOKEN,
          )}`,
        },
      },
    );

    eventSource.addEventListener('new_thread', () => {
      queryClient.invalidateQueries(['threadData', teamPlaceId]);

      setTimeout(() => {
        scrollToBottom();
      }, 200);
    });

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient, teamPlaceId, ref]);
};
