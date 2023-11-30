import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '~/apis/http';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useToken } from '~/hooks/useToken';

export const useSSE = (teamPlaceId: number) => {
  const queryClient = useQueryClient();
  const { accessToken } = useToken();

  useEffect(() => {
    const connect = () => {
      if (!teamPlaceId) {
        return;
      }

      const eventSource = new EventSourcePolyfill(
        baseUrl + `/api/team-place/${teamPlaceId}/subscribe`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      eventSource.addEventListener('new_thread', (e) => {
        console.log(e.data);
        console.log(e.data.content);
        queryClient.invalidateQueries(['threadData', teamPlaceId]);
      });

      return () => {
        eventSource.close();
      };
    };

    connect();
  }, [queryClient, teamPlaceId, accessToken]);
};
