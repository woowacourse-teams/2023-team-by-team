import type { Meta, StoryObj } from '@storybook/react';
import Header from '~/components/common/Header/Header';

const meta = {
  title: 'common/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
