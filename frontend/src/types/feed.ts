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
