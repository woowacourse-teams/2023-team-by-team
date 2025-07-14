import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { useToken } from '~/hooks/useToken';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import type { ThreadsResponse } from '~/apis/feed';
import { Client } from '@stomp/stompjs';
import type { StompThreadRequest, StompThreadResponse } from '~/types/feed';
import { baseUrl } from '~/apis/http';
import { useFetchUserInfo } from '~/hooks/queries/useFetchUserInfo';

const BASE_URL = baseUrl === undefined ? 'http://localhost:3000' : baseUrl;

export const useStompThread = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useToken();
  const { teamPlaceId } = useTeamPlace();
  const [client, setClient] = useState<Client | null>(null);
  const { userInfo } = useFetchUserInfo();

  useEffect(() => {
    if (!teamPlaceId) {
      return;
    }

    const stompClient = new Client({
      brokerURL: `${BASE_URL}/ws/chat`,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        stompClient.subscribe(
          `/topic/room/${teamPlaceId}`,
          (incomingMessage) => {
            const stompThreadResponse: StompThreadResponse = JSON.parse(
              incomingMessage.body,
            );
            const { requestId, ...newThread } = stompThreadResponse.payload;

            queryClient.setQueryData<InfiniteData<ThreadsResponse>>(
              ['threadData', teamPlaceId],
              (oldData) => {
                if (oldData) {
                  const newFirstPageThreads = {
                    threads: [
                      {
                        ...newThread,
                        type: 'thread',
                        isMe: newThread.authorId === userInfo?.id,
                      },
                      ...oldData.pages[0].threads,
                    ],
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
          },
          { Authorization: `Bearer ${accessToken}` },
        );
      },
      reconnectDelay: 5000,
    });

    setClient(stompClient);
    stompClient.activate();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [accessToken, queryClient, teamPlaceId]);

  const sendThreadToStomp = (threadRequestInfo: StompThreadRequest) => {
    const { content, imageIds, requestId } = threadRequestInfo;

    if (!client || (content.trim() === '' && imageIds.length === 0)) {
      return;
    }

    client.publish({
      destination: `/app/room/${teamPlaceId}`,
      body: JSON.stringify({ content, imageIds }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        RequestId: requestId,
        body: JSON.stringify({ content, imageIds }),
      },
    });
  };

  return { sendThreadToStomp };
};
