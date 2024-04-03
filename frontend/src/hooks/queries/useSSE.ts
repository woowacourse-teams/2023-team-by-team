import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { baseUrl } from '~/apis/http';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useToken } from '~/hooks/useToken';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import type { ThreadsResponse } from '~/apis/feed';

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

    eventSource.addEventListener('connect', () => {
      queryClient.invalidateQueries([['threadData', teamPlaceId]]);
    });

    eventSource.addEventListener('new_thread', (e) => {
      const newThread = JSON.parse(e.data);

      queryClient.setQueryData<InfiniteData<ThreadsResponse>>(
        ['threadData', teamPlaceId],
        (oldData) => {
          if (oldData) {
            const newFirstPageThreads = {
              threads: [newThread, ...oldData.pages[0].threads],
            };
            const newData = {
              pageParams: oldData.pageParams,
              pages:
                oldData.pages.length === 1
                  ? [newFirstPageThreads]
                  : [newFirstPageThreads, ...oldData.pages.slice(1)],
            };

            return newData;
          }
        },
      );
    });

    return () => {
      eventSource.close();
    };
  }, [queryClient, teamPlaceId, accessToken]);

  useEffect(() => {
    return connect();
  }, [connect]);
};
