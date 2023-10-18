import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '~/apis/http';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';

export const useSSE = (teamPlaceId: number) => {
  const queryClient = useQueryClient();
  const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>();

  const connect = () => {
    return new EventSourcePolyfill(
      baseUrl + `/api/team-place/${teamPlaceId}/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_KEY.ACCESS_TOKEN,
          )}`,
        },
      },
    );
  };

  useEffect(() => {
    if (!teamPlaceId) {
      return;
    }

    setEventSource(() => connect());

    if (!eventSource) return;

    eventSource.addEventListener('new_thread', () => {
      queryClient.invalidateQueries(['threadData', teamPlaceId]);
    });

    eventSource.onerror = (event) => {
      console.log(event);
      eventSource.close();
      // if (eventSource.readyState === ) {
      //   setEventSource(() => connect());
      // }
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient, teamPlaceId, eventSource]);
};
