import type { Meta, StoryObj } from '@storybook/react';
import Notification from '~/components/feed/Notification/Notification';

const meta = {
  title: 'Feed/Notification',
  component: Notification,
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: '알림에 쓰일 내용을 의미합니다.',
    },
    type: {
      description:
        '알림의 종류를 의미합니다. 알림의 종류에 따라 보여지는 아이콘이 달라집니다.',
    },
    time: {
      description: '알림의 우측에 표시될 알림의 수신 시각을 의미합니다.',
    },
    size: {
      description:
        '알림 컴포넌트의 크기를 의미합니다. 사용처에 맞게 적절한 값을 사용하십시오.',
    },
  },
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'normal',
    content: '기본 알림입니다.',
  },
};

export const LongContent: Story = {
  args: {
    type: 'normal',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce suscipit ac diam ac viverra. Integer euismod, nulla id ullamcorper posuere, mauris ex luctus mauris, eget tincidunt mi dolor vel ante.',
  },
};

export const Join: Story = {
  args: {
    type: 'join',
    time: '23:35',
    content: '팀바팀 님이 입장하셨습니다.',
  },
};

export const Leave: Story = {
  args: {
    type: 'leave',
    time: '23:35',
    content: '팀바팀 님이 퇴장하셨습니다.',
  },
};

export const Date: Story = {
  args: {
    type: 'date',
    content: '2023년 2월 7일',
  },
};

export const Small: Story = {
  args: {
    type: 'join',
    time: '23:35',
    content: '팀바팀 님이 입장하셨습니다.',
    size: 'sm',
  },
};
