import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '~/apis/http';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { S } from 'msw/lib/glossary-de6278a9';

export const useSSE = (teamPlaceId: number) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN),
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log(accessToken);

    const handleChangeAccessToken = () => {
      setAccessToken(localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN));
    };

    window.addEventListener('storage', handleChangeAccessToken);

    return () => window.removeEventListener('storage', handleChangeAccessToken);
  }, []);

  useEffect(() => {
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

    eventSource.addEventListener('new_thread', () => {
      queryClient.invalidateQueries(['threadData', teamPlaceId]);
    });

    return () => {
      eventSource.close();
    };
  }, [queryClient, teamPlaceId, accessToken]);
};
