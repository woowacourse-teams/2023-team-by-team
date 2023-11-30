import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '~/apis/http';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useToken } from '~/hooks/useToken';
import { useTeamPlace } from '~/hooks/useTeamPlace';

export const useSSE = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useToken();
  const { teamPlaceId } = useTeamPlace();
  const currentId = teamPlaceId;

  useEffect(() => {
    const connect = () => {
      console.log(teamPlaceId);
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
        console.log('1 ' + e.data);

        queryClient.invalidateQueries(['threadData', teamPlaceId]);
      });

      if (currentId !== teamPlaceId) eventSource.close();

      return () => {
        eventSource.close();
      };
    };

    connect();
  }, [queryClient, teamPlaceId, accessToken]);
};
