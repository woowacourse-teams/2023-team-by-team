import type { Meta, StoryObj } from '@storybook/react';
import TimeTableMenu from '~/components/TimeTableMenu/TimeTableMenu';

const meta = {
  title: 'Calendar/TimeTableMenu',
  component: TimeTableMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof TimeTableMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    displayValue: '00:00',
    onClickMenu: () => {
      alert('Clicked!');
    },
  },
};
