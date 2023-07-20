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
    id: '1',
    scheduleId: 1,
    title: 'ea',
    row: 1,
    column: 2,
    duration: 3,
    level: 0,
    // eslint-disable-next-line
    //@ts-ignore
    ref: null,
    handleClick: () => console.log('click'),
  },
};
