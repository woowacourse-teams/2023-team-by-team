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
        const data = e.data.json();
        console.log('1 ' + e.data);
        console.log('2 ' + JSON.parse(e.data));
        console.log('3 ' + data);

        queryClient.invalidateQueries(['threadData', teamPlaceId]);
      });

      return () => {
        eventSource.close();
      };
    };

    connect();
  }, [queryClient, teamPlaceId, accessToken]);
};
