import type { Meta, StoryObj } from '@storybook/react';
import TeamCalendar from '~/components/team_calendar/TeamCalendar/TeamCalendar';

const meta = {
  title: 'Calendar/TeamCalendar',
  component: TeamCalendar,
  tags: ['autodocs'],
} satisfies Meta<typeof TeamCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
