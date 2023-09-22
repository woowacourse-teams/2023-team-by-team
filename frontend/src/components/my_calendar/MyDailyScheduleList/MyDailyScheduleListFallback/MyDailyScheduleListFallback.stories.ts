import type { Meta, StoryObj } from '@storybook/react';
import MyDailyScheduleListFallback from './MyDailyScheduleListFallback';

const meta = {
  title: 'Fallback/MyDailyScheduleListFallback',
  component: MyDailyScheduleListFallback,
  tags: ['autodocs'],
} satisfies Meta<typeof MyDailyScheduleListFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
