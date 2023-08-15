import type { TeamPlace } from '~/types/team';

interface InviteTeamPlace extends TeamPlace {
  inviteCode: string;
}

export const teamPlaces: TeamPlace[] = [
  {
    id: 1,
    displayName: '인공지능 신비주의자들',
    teamPlaceColor: 0,
  },
  {
    id: 2,
    displayName: '[3조] 환경 구원 대작전',
    teamPlaceColor: 1,
  },
  {
    id: 3,
    displayName: '윤리와 인간관계 2조',
    teamPlaceColor: 2,
  },
  {
    id: 4,
    displayName: '문화 다양성과 소통 1조 팀플레이스입니다.',
    teamPlaceColor: 3,
  },
  {
    id: 5,
    displayName: '그냥 저희 빨리 하고 끝내죠',
    teamPlaceColor: 4,
  },
  {
    id: 6,
    displayName: '!! 게임 동아리',
    teamPlaceColor: 5,
  },
  {
    id: 7,
    displayName: '북클럽 스터디 7기',
    teamPlaceColor: 6,
  },
  {
    id: 8,
    displayName: '우아한테크코스 팀바팀',
    teamPlaceColor: 7,
  },
  {
    id: 9,
    displayName: 'English II',
    teamPlaceColor: 8,
  },
  {
    id: 10,
    displayName: '현대사회와 범죄 5조',
    teamPlaceColor: 9,
  },
];

export const inviteTeams: InviteTeamPlace[] = [
  {
    id: 100,
    displayName: '응애로이',
    teamPlaceColor: 1,
    inviteCode: 'aaaaaaaa',
  },
  {
    id: 200,
    displayName: '응애필립',
    teamPlaceColor: 2,
    inviteCode: 'bbbbbbbb',
  },
  {
    id: 300,
    displayName: '응애유스',
    teamPlaceColor: 3,
    inviteCode: 'ccccccccc',
  },
  {
    id: 400,
    displayName: '응애성하',
    teamPlaceColor: 4,
    inviteCode: 'dddddddd',
  },
  {
    id: 500,
    displayName: '응애엔델',
    teamPlaceColor: 5,
    inviteCode: 'eeeeeeee',
  },
  {
    id: 600,
    displayName: '응애요토',
    teamPlaceColor: 6,
    inviteCode: 'ffffffff',
  },
  {
    id: 700,
    displayName: '응애루루',
    teamPlaceColor: 7,
    inviteCode: 'gggggggg',
  },
];

export const INVITE_CODE = 'ABCD1234';

export const MEMBERS = [
  {
    id: 1,
    name: '필립',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
  },
  {
    id: 2,
    name: '성하',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
  },
  {
    id: 3,
    name: '로이',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
  },
  {
    id: 4,
    name: '엔델',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
  },
  {
    id: 5,
    name: '루루',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
  },
  {
    id: 6,
    name: '요술토끼',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
  },
  {
    id: 7,
    name: '유스',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
  },
];
