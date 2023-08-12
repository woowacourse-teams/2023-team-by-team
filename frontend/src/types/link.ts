import type { YYYYMMDDHHMM } from '~/types/schedule';

export interface TeamLink {
  id: number;
  memberId: number;
  memberName: string;
  updatedAt: YYYYMMDDHHMM;
  title: string;
  url: string;
}

export type TeamLinkWithOutInfo = Pick<TeamLink, 'title' | 'url'>;
