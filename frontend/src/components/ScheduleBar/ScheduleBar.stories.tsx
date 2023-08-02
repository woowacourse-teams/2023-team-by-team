import type { Meta, StoryObj } from '@storybook/react';
import ScheduleBar from '~/components/ScheduleBar/ScheduleBar';

const meta = {
  title: 'Schedule/ScheduleBar',
  component: ScheduleBar,
  tags: ['autodocs'],
} satisfies Meta<typeof ScheduleBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    scheduleId: 1,
    schedule: {
      id: 1,
      title: '테스트',
      startDateTime: '2023-07-07 05:00',
      endDateTime: '2023-07-09 10:00',
    },
    title: '테스트',
    row: 1,
    column: 2,
    duration: 3,
    level: 0,
    onClick: () => alert('clicked!'),
  },
};
