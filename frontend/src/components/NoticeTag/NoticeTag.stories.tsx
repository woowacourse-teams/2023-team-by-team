import type { Meta, StoryObj } from '@storybook/react';
import NoticeTag from './NoticeTag';

const meta = {
  title: 'NoticeTag',
  component: NoticeTag,
  tags: ['autodocs'],
} satisfies Meta<typeof NoticeTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
