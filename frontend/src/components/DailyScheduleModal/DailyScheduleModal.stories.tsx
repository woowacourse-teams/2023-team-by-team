import type { Meta, StoryObj } from '@storybook/react';
import DailyScheduleModal from '~/components/DailyScheduleModal/DailyScheduleModal';
import Button from '~/components/common/Button/Button';
import { useModal } from '~/hooks/useModal';
import type { SchedulePosition } from '~/types/schedule';

const meta = {
  title: 'Schedule/DailyScheduleModal',
  component: DailyScheduleModal,
} satisfies Meta<typeof DailyScheduleModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onScheduleModalOpen: ({
      scheduleId,
      row,
      column,
      level,
    }: SchedulePosition & {
      scheduleId: number;
    }) => {
      alert(`${scheduleId}, ${row}, ${column}, ${level}`);
    },
    onSetModalType: () => alert('hi'),
    position: { row: 0, column: 0 },
    rawDate: new Date(),
  },
};
