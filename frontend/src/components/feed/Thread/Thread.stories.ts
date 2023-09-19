import type { Meta, StoryObj } from '@storybook/react';
import Thread from './Thread';

const meta = {
  title: 'Feed/Thread',
  component: Thread,
  tags: ['autodocs'],
} satisfies Meta<typeof Thread>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    authorName: '팀바팀_필립',
    isMe: false,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content:
      '1. 3차 데모데이까지의 기한은 2023/10/25 입니다.\n2. 팀 그라운드 룰을 정해야 합니다.\n3. 디자인 시안이 완료되어야 합니다.\n\n위의 일정을 고려하여 조별 과제 수행해 주시기 바랍니다, 감사합니다.',
    images: [],
    isContinuity: false,
  },
};

export const Small: Story = {
  args: {
    threadSize: 'sm',
    authorName: '팀바팀_필립',
    isMe: false,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content:
      '1. 3차 데모데이까지의 기한은 2023/10/25 입니다.\n2. 팀 그라운드 룰을 정해야 합니다.\n3. 디자인 시안이 완료되어야 합니다.\n\n위의 일정을 고려하여 조별 과제 수행해 주시기 바랍니다, 감사합니다.',
    images: [],
    isContinuity: false,
  },
};

export const ShortContent: Story = {
  args: {
    authorName: '팀바팀_필립',
    isMe: false,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content: '3차 데모데이까지의 기한은 2023/10/25 입니다.',
    images: [],
    isContinuity: false,
  },
};

export const LongContent: Story = {
  args: {
    authorName: '팀바팀_필립',
    isMe: false,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

    images: [],
    isContinuity: false,
  },
};
