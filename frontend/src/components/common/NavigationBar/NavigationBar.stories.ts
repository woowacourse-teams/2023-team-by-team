import type { Meta, StoryObj } from '@storybook/react';
import NavigationBar from '~/components/common/NavigationBar/NavigationBar';

const meta = {
  title: 'common/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
