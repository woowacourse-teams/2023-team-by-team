import type { Meta, StoryObj } from '@storybook/react';
import MyCalendar from './MyCalendar';

const meta = {
  title: 'Calendar/MyCalendar',
  component: MyCalendar,
  tags: ['autodocs'],
} satisfies Meta<typeof MyCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
