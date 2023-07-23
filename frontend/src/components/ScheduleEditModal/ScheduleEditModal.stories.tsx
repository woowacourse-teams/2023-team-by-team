import type { Meta, StoryObj } from '@storybook/react';
import ScheduleEditModal from '~/components/ScheduleEditModal/ScheduleEditModal';

const meta = {
  title: 'ScheduleEditModal',
  component: ScheduleEditModal,
  tags: ['autodocs'],
} satisfies Meta<typeof ScheduleEditModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    teamPlaceName: '',
    scheduleId: 1,
  },
};
