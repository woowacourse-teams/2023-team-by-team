import type { THREAD_TYPE } from '~/constants/feed';
import type { YYYYMMDDHHMM } from '~/types/schedule';

export interface Thread {
  id: number;
  type: (typeof THREAD_TYPE)[keyof typeof THREAD_TYPE];
  authorId: number;
  authorName: string;
  profileImageUrl: string | null;
  createdAt: YYYYMMDDHHMM;
  content: string;
}

export type NoticeThread = Omit<Thread, 'type'> | Record<string, never>;
