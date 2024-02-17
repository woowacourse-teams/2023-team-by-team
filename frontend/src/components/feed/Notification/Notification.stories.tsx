import type { Meta, StoryObj } from '@storybook/react';
import Notification from '~/components/feed/Notification/Notification';
import { EnterIcon } from '~/assets/svg';

const meta = {
  title: 'Feed/Notification',
  component: Notification,
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: '알림에 쓰일 내용을 의미합니다.',
    },
    icon: {
      description:
        '알림의 좌측에 표시될 아이콘을 의미합니다. 아이콘은 **리액트 컴포넌트 방식의 SVG 이미지**여야 합니다. 아이콘의 색상 및 크기는 자동으로 조정됩니다.',
    },
    time: {
      description: '알림의 우측에 표시될 알림의 수신 시각을 의미합니다.',
    },
  },
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: '기본 알림입니다.',
  },
};

export const LongContent: Story = {
  args: {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce suscipit ac diam ac viverra. Integer euismod, nulla id ullamcorper posuere, mauris ex luctus mauris, eget tincidunt mi dolor vel ante.',
  },
};

export const Time: Story = {
  args: {
    time: '23:35',
    content: '팀바팀 님이 입장하셨습니다.',
  },
};

export const Icon: Story = {
  args: {
    icon: <EnterIcon />,
    content: '팀바팀 님이 입장하셨습니다.',
  },
};

export const TimeAndIcon: Story = {
  args: {
    time: '23:35',
    icon: <EnterIcon />,
    content: '팀바팀 님이 입장하셨습니다.',
  },
};
