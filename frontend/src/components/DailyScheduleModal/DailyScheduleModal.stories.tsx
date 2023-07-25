import type { Meta, StoryObj } from '@storybook/react';
import DailyScheduleModal from '~/components/DailyScheduleModal/DailyScheduleModal';
import Button from '~/components/common/Button/Button';
import { useModal } from '~/hooks/useModal';
import type { SchedulePosition } from '~/types/schedule';

const meta = {
  title: 'DailyScheduleModal',
  component: DailyScheduleModal,
} satisfies Meta<typeof DailyScheduleModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { openModal } = useModal();

    return (
      <>
        <Button onClick={openModal}>모달 열기</Button>
        <DailyScheduleModal
          onSetModalType={() => console.log('hi')}
          rawDate={new Date()}
          position={{ row: 0, column: 0 }}
          onScheduleModalOpen={({ scheduleId, row, column, level }) =>
            console.log(scheduleId, row, column, level)
          }
        />
      </>
    );
  },
  args: {
    onScheduleModalOpen: ({
      scheduleId,
      row,
      column,
      level,
    }: SchedulePosition & {
      scheduleId: number;
    }) => {
      console.log(scheduleId, row, column, level);
    },
    onSetModalType: () => console.log('hi'),
    position: { row: 0, column: 0 },
    rawDate: new Date(),
  },
};
