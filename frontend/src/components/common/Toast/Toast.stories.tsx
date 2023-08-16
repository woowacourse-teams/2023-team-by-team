import type { Meta, StoryObj } from '@storybook/react';
import Toast from './Toast';

const meta = {
  title: 'common/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    status: 'success',
    message: '기본 Toast입니다.',
    isActive: true,
  },
};

export const Error: Story = {
  args: {
    id: '2',
    status: 'error',
    message: '에러 Toast입니다.',
    isActive: true,
  },
};
