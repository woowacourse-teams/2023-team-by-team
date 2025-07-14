import type { THREAD_TYPE } from '~/constants/feed';
import type { YYYYMMDDHHMM } from '~/types/schedule';

export interface Thread {
  id: number;
  type: (typeof THREAD_TYPE)[keyof typeof THREAD_TYPE];
  authorId: number;
  authorName: string;
  profileImageUrl: string;
  isMe: boolean;
  createdAt: YYYYMMDDHHMM;
  content: string;
  images: ThreadImage[];
}

export interface ThreadImage {
  id: number;
  isExpired: boolean;
  name: string;
  url: string;
}

export type NoticeThread =
  | Omit<Thread, 'type' | 'isMe'>
  | Record<string, never>;

export type ThreadContent = Pick<Thread, 'content'> & {
  images: File[];
};

export interface ThreadImage {
  id: number;
  isExpired: boolean;
  name: string;
  url: string;
}

export interface PreviewImage {
  uuid: string;
  url: string;
}

export interface FileWithUuid {
  uuid: string;
  file: File;
}

interface ThreadText {
  type: 'text';
  text: string;
}

interface ThreadLink {
  type: 'link';
  text: string;
  link: string;
}

export type ParsedThreadContent = (ThreadText | ThreadLink)[];

export type NotificationType = 'normal' | 'join' | 'leave' | 'date';

/**
 * 채팅 전송 시 Stomp 서버로 보낼, 사용자가 입력한 채팅의 정보입니다.
 */
export interface StompThreadRequest {
  /**
   * 채팅의 내용입니다.
   */
  content: string;
  /**
   * 채팅에 첨부할 이미지의 ID값입니다. 이 ID값은 이미지를 업로드하여 **API 서버에 요청한 이후 응답으로 받은, 이미지에 대응하는 ID 값**이어야 합니다.
   */
  imageIds: string[];
  /**
   * **채팅을 식별할 때 사용할** 문자열 형태의 ID 값입니다. 이후 이 채팅이 올바르게 서버로 전달되어 서버를 통해 채팅이 내려올 경우, 서버에서 이 ID를 함께 반환하므로 이를 이용해 식별할 수 있습니다.
   * 어떠한 문자열 값이어도 상관없으나, 충돌할 가능성이 매우 적어야 하며, 너무 긴 문자열, 공백 등 ID 값으로 적합하지 않은 값은 사용하지 말아야 합니다. UUID 값을 두는 것이 추천될 것입니다.
   */
  requestId: string;
}

export interface StompThreadResponse {
  payload: Omit<Thread, 'type' | 'isMe'> & { requestId: string };
}
