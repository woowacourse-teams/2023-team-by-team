import { ws } from 'msw';
import type { StompThreadResponse } from '~/types/feed';
import { generateYYYYMMDDHHMM } from '~/utils/generateYYYYMMDDHHMM';

const chat = ws.link('/ws/chat');

export const stompHandlers = [
  chat.addEventListener('connection', ({ client }) => {
    client.addEventListener('message', (event) => {
      const message = String(event.data);
      const [command, ...headers] = message.split('\n\n')[0].split('\n');
      const rawBody = message
        .split('\n\n')
        .slice(1)
        .join('\n\n')
        .replace('\0', '');
      const body = rawBody === '' ? undefined : JSON.parse(rawBody);

      if (command === 'CONNECT') {
        client.send(
          'CONNECTED\nversion:1.2\nheart-beat:0,0\nserver:TeamByTeamStompMockServer\n\n\0',
        );

        setTimeout(() => {
          const connectOkThread: StompThreadResponse = {
            payload: {
              id: Date.now(),
              authorId: 1,
              authorName: 'STOMP 모킹 서버',
              profileImageUrl:
                'https://github.com/user-attachments/assets/75220af3-66e8-4cda-b164-49de0b3d992b',
              isMe: false,
              createdAt: generateYYYYMMDDHHMM(new Date()),
              content:
                '성공적으로 Websocket을 이용한 STOMP 모킹 서버에 연결하였습니다.',
              images: [],
              requestId: '',
            },
          };

          client.send(
            `MESSAGE\ndestination:https://localhost:3000/topic/room/1\nsubscription:sub-0\nmessage-id:1\ncontent-type:text/plain\n\n${JSON.stringify(
              connectOkThread,
            )}\0`,
          );
        }, 100);

        return;
      }

      if (command === 'SUBSCRIBE') {
        return;
      }

      if (command === 'SEND') {
        const { content } = body;

        setTimeout(() => {
          const myThread: StompThreadResponse = {
            payload: {
              id: Date.now(),
              authorId: 1,
              authorName: '나',
              profileImageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
              isMe: true,
              createdAt: generateYYYYMMDDHHMM(new Date()),
              content,
              requestId: '',
              images: [],
            },
          };

          client.send(
            `MESSAGE\ndestination:/topic/room/1\nsubscription:sub-0\nmessage-id:1\ncontent-type:text/plain\n\n${JSON.stringify(
              myThread,
            )}\0`,
          );
        }, 100);
      }
    });
  }),
];
