import type { Meta, StoryObj } from '@storybook/react';

import Notification from '~/components/ThreadList/Notification/Notification';

const meta = {
  title: 'Feed/Notification',
  component: Notification,
  tags: ['autodocs'],
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    teamPlaceColor: 0,
    content: "'범죄심리학 발표자료..' 일정이 수정되었습니다.",
  },
};

export const Small: Story = {
  args: {
    teamPlaceColor: 0,
    content: "'범죄심리학 발표자료..' 일정이 수정되었습니다.",
    size: 'sm',
  },
};

export const LongContent: Story = {
  args: {
    teamPlaceColor: 0,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
};

export const ScheduleNotification: Story = {
  args: {
    teamPlaceColor: 0,
    content:
      '데일리 미팅 일정이 수정되었습니다. \n제목 변경 : 데일리 미팅 > 조별 데일리 미팅 \n기간 변경 : 2023년 9월 1일 10시 00분 ~ 2023년 9월 1일 10시 30분 > 2023년 9월 1일 10시 00분 ~ 2023년 9월 1일 10시 30분',
  },
};
