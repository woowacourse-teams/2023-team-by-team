import type { Meta, StoryObj } from '@storybook/react';

import Notification from '~/components/Notification/Notification';

const meta = {
  title: 'Feed/Notification',
  component: Notification,
  tags: ['autodocs'],
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "'범죄심리학 발표자료..' 일정이 수정되었습니다.",
  },
};

export const Small: Story = {
  args: {
    content: "'범죄심리학 발표자료..' 일정이 수정되었습니다.",
    size: 'sm',
  },
};
