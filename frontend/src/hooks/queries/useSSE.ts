import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '~/apis/http';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';

export const useSSE = (teamPlaceId: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!teamPlaceId) {
      return;
    }

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

    eventSource.addEventListener('new_thread', (e: MessageEvent) => {
      console.log(JSON.parse(e.data));
    });

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient, teamPlaceId]);
};
