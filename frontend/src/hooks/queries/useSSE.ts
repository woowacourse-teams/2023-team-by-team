import { useCallback, useEffect } from 'react';
import { type InfiniteData, useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '~/apis/http';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useToken } from '~/hooks/useToken';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import type { ThreadsResponse } from '~/apis/feed';
import type { Thread } from '~/types/feed';

export const useSSE = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useToken();
  const { teamPlaceId } = useTeamPlace();

  const connect = useCallback(() => {
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
      const newThread = JSON.parse(e.data);

      queryClient.setQueryData<InfiniteData<ThreadsResponse>>(
        ['threadData', teamPlaceId],
        (old) => {
          if (old) {
            old.pages[0].threads = [newThread, ...old.pages[0].threads];

            return old;
          }
        },
      );

      const newList = queryClient.getQueryData<ThreadsResponse>([
        'threadData',
        teamPlaceId,
      ]);
      console.log(newList);
    });

    return () => {
      eventSource.close();
    };
  }, [queryClient, teamPlaceId, accessToken]);

  useEffect(() => {
    return connect();
  }, [connect]);
};
