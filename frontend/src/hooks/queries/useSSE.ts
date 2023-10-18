import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '~/apis/http';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useToken } from '~/hooks/useToken';

export const useSSE = (teamPlaceId: number) => {
  const queryClient = useQueryClient();
  const { token } = useToken();

  useEffect(() => {
    const connect = () => {
      if (!teamPlaceId) {
        return;
      }

      console.log('token : ' + token);

      const eventSource = new EventSourcePolyfill(
        baseUrl + `/api/team-place/${teamPlaceId}/subscribe`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      eventSource.addEventListener('new_thread', () => {
        queryClient.invalidateQueries(['threadData', teamPlaceId]);
      });

      return () => {
        eventSource.close();
      };
    };

    connect();
  }, [queryClient, teamPlaceId, token]);
};
