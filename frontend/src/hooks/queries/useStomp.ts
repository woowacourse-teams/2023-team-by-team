import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { useToken } from '~/hooks/useToken';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import type { ThreadsResponse } from '~/apis/feed';
import { Client } from '@stomp/stompjs';
import type { NoticeThread } from '~/types/feed';
import { generateUuid } from '~/utils/generateUuid';

interface StompThreadContent {
  type: 'thread' | 'notice';
  content: string;
  imagesId: string[];
}

export const useStomp = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useToken();
  const { teamPlaceId } = useTeamPlace();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    if (teamPlaceId === 0) {
      return;
    }

    const stompClient = new Client({
      brokerURL: `${location.origin}/ws/connect`,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        stompClient.subscribe(
          `${location.origin}/topic/room/${teamPlaceId}`,
          (incomingMessage) => {
            const newThread = JSON.parse(incomingMessage.body);

            if (newThread.type === 'notice') {
              queryClient.setQueryData<NoticeThread>(
                ['noticeThread', teamPlaceId],
                newThread,
              );

              return;
            }

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
          },
        );
      },
      debug: (content) => {
        console.log(content);
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

  const sendThreadToStomp = (
    thread: StompThreadContent,
    callback: () => void,
  ) => {
    if (
      !client ||
      (thread.content.trim() === '' && thread.imagesId.length === 0)
    ) {
      return;
    }

    const receiptId = generateUuid();

    client.watchForReceipt(receiptId, () => {
      alert('Receipt!!');
      callback();
    });

    client.publish({
      destination: `/app/room/${teamPlaceId}`,
      body: JSON.stringify(thread),
      headers: {
        receipt: receiptId,
      },
    });
  };

  return { sendThreadToStomp };
};
