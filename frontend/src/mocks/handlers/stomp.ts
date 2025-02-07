import { ws } from 'msw';
import { generateYYYYMMDDHHMM } from '~/utils/generateYYYYMMDDHHMM';

const chat = ws.link('/ws/connect');
let clientId = '';
let teamPlaceId = 0;

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
      const receiptId = headers
        .find((header) => header.startsWith('receipt:'))
        ?.split(':')[1];

      console.log({ message, command, headers, body });

      if (command === 'CONNECT') {
        client.send(
          'CONNECTED\nversion:1.2\nheart-beat:10000,10000\nserver:TeamByTeamStompMockServer\n\n\0',
        );

        setTimeout(() => {
          const connectOkThread = {
            id: Date.now(),
            type: 'thread',
            authorId: 1,
            authorName: 'STOMP 모킹 서버',
            profileImageUrl:
              'https://github.com/user-attachments/assets/75220af3-66e8-4cda-b164-49de0b3d992b',
            isMe: false,
            createdAt: generateYYYYMMDDHHMM(new Date()),
            content:
              '성공적으로 Websocket을 이용한 STOMP 모킹 서버에 연결하였습니다.',
            images: [],
          };

          client.send(
            `MESSAGE\ndestination:https://localhost:3000/topic/room/7\nsubscription:sub-0\nmessage-id:1\ncontent-type:text/plain\n\n${JSON.stringify(
              connectOkThread,
            )}\0`,
          );
        }, 100);

        return;
      }

      if (command === 'SUBSCRIBE') {
        clientId = String(event.data).split('\n')[1].replace('id:', '');
        teamPlaceId = Number(
          String(event.data).split('\n')[2].split('/').at(-1),
        );

        return;
      }

      if (command === 'DISCONNECT') {
        console.log('OK, Client wants disconnect');
      }

      if (command === 'SEND') {
        console.log(headers, body);

        const { type, content } = body;

        const myThread = {
          id: Date.now(),
          type,
          authorId: 1,
          authorName: '나',
          profileImageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
          isMe: true,
          createdAt: generateYYYYMMDDHHMM(new Date()),
          content,
          images: [],
        };

        client.send(
          `MESSAGE\ndestination:https://localhost:3000/topic/room/${teamPlaceId}\nsubscription:${clientId}\nmessage-id:1\ncontent-type:text/plain\n\n${JSON.stringify(
            myThread,
          )}\0`,
        );

        setTimeout(() => {
          client.send(`RECEIPT\nreceipt-id: ${receiptId}\0`);
        }, 100);

        return;
      }

      /**
       * PING에 대한 응답 분기입니다.
       *
       * 설정에 따라 Stomp 클라이언트는 서버와의 연결 상태가 원활한지를 확인하기 위해 빈 줄의 요청을 보내는 경우가 있습니다.
       * 이 경우에는 아무 데이터(본 코드에서는 빈 줄)로 응답하면 클라이언트 측에서 연결 상태가 원활하다고 판정하고 연결을 유지합니다.
       *
       * 응답이 연이어 없을 경우에는 연결이 원활하지 않은 것으로 판단하고 재연결을 시도하게 됩니다.
       */
      if (command === '') {
        client.send('\n\0');
      }
    });
  }),
];
