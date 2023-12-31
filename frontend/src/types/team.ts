export type TeamPlaceColor = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 100;

export interface TeamPlace {
  id: number;
  displayName: string;
  teamPlaceColor: TeamPlaceColor;
}

export interface TeamInfo {
  teamPlaceId: number;
  name: string;
}

export interface UserInfo {
  id: number;
  name: string;
  profileImageUrl: string;
  email: string;
  isMe: boolean;
}
