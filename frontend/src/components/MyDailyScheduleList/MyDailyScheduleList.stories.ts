import type { Meta, StoryObj } from '@storybook/react';
import MyDailyScheduleList from './MyDailyScheduleList';

const meta = {
  title: 'Calendar/MyDailyScheduleList',
  component: MyDailyScheduleList,
  tags: ['autodocs'],
} satisfies Meta<typeof MyDailyScheduleList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rawDate: new Date(),
  },
};
