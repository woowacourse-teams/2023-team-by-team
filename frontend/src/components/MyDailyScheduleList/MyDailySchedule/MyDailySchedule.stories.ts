import type { Meta, StoryObj } from '@storybook/react';
import MyDailySchedule from './MyDailySchedule';

const meta = {
  title: 'Calendar/MyDailySchedule',
  component: MyDailySchedule,
  tags: ['autodocs'],
} satisfies Meta<typeof MyDailySchedule>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    teamPlaceColor: 0,
    title: '크로코아이트',
    currentDateTime: '2023-07-01 00:00',
    startDateTime: '2023-07-01 12:00',
    endDateTime: '2023-07-01 16:00',
    teamName: '아에디스트',
  },
};

export const LongSchedule: Story = {
  args: {
    teamPlaceColor: 0,
    title: '엄청 엄청 긴 일정 제목입니다.너무 길어서 어떻게 보일지 모르겠어요',
    currentDateTime: '2023-07-01 00:00',
    startDateTime: '2023-07-01 12:00',
    endDateTime: '2023-07-01 16:00',
    teamName:
      '엄청 엄청 긴 팀 이름입니다. 너무 길어서 어떻게 보일지 모르겠어요',
  },
};

export const StartSchedule: Story = {
  args: {
    teamPlaceColor: 2,
    title: '아쿠아마린',
    currentDateTime: '2023-07-01 00:00',
    startDateTime: '2023-07-01 12:00',
    endDateTime: '2023-07-03 12:00',
    teamName: '이오파이트',
  },
};

export const MiddleSchedule: Story = {
  args: {
    teamPlaceColor: 2,
    title: '아쿠아마린',
    currentDateTime: '2023-07-02 00:00',
    startDateTime: '2023-07-01 12:00',
    endDateTime: '2023-07-03 12:00',
    teamName: '이오파이트',
  },
};

export const EndSchedule: Story = {
  args: {
    teamPlaceColor: 2,
    title: '아쿠아마린',
    currentDateTime: '2023-07-03 00:00',
    startDateTime: '2023-07-01 12:00',
    endDateTime: '2023-07-03 12:00',
    teamName: '이오파이트',
  },
};
