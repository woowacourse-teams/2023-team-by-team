import type { Meta, StoryObj } from '@storybook/react';
import ScheduleMoreCell from '~/components/team_calendar/ScheduleMoreCell/ScheduleMoreCell';

const meta = {
  title: 'Schedule/ScheduleMoreCell',
  component: ScheduleMoreCell,
} satisfies Meta<typeof ScheduleMoreCell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { column: 0 },
};
