import type { Meta, StoryObj } from '@storybook/react';
import ThreadList from '~/components/feed/ThreadList/ThreadList';

const meta = {
  title: 'Feed/ThreadList',
  component: ThreadList,
  tags: ['autodocs'],
} satisfies Meta<typeof ThreadList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
