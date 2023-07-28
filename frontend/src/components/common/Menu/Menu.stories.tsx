import type { Meta, StoryObj } from '@storybook/react';
import Menu from '~/components/common/Menu/Menu';

const meta = {
  title: 'common/Menu',
  component: Menu,
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menuItems: ['메뉴 1', '메뉴 2', '메뉴 3'],
  },
};
