import type { Meta, StoryObj } from '@storybook/react';
import MyCalendar from './MyCalendar';

const meta = {
  title: 'Calendar/MyCalendar',
  component: MyCalendar,
  tags: ['autodocs'],
} satisfies Meta<typeof MyCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    teamPlaces: [
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
    ],
  },
};
