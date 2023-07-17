import type { Meta, StoryObj } from '@storybook/react';
import ScheduleBar from '~/components/ScheduleBar/ScheduleBar';

const meta = {
  title: 'Calendar/ScheduleBar',
  component: ScheduleBar,
  tags: ['autodocs'],
} satisfies Meta<typeof ScheduleBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'red',
  },
};
