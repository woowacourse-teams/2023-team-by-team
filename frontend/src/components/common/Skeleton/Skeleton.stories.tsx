import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from '~/components/common/Skeleton/Skeleton';

const meta = {
  title: 'common/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
