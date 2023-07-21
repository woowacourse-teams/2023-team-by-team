import type { Meta, StoryObj } from '@storybook/react';
import IntegratedCalendar from '~/components/IntegratedCalendar/IntegratedCalendar';

const meta = {
  title: 'Calender/IntegratedCalendar',
  component: IntegratedCalendar,
  tags: ['autodocs'],
} satisfies Meta<typeof IntegratedCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
