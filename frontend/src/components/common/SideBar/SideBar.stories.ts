import type { Meta, StoryObj } from '@storybook/react';
import SideBar from '~/components/common/SideBar/SideBar';

const meta = {
  title: 'common/SideBar',
  component: SideBar,
  tags: ['autodocs'],
} satisfies Meta<typeof SideBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
