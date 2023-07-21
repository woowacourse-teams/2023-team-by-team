import type { Meta, StoryObj } from '@storybook/react';
import { useModal } from '~/hooks/useModal';
import ScheduleModal from '~/components/ScheduleModal/ScheduleModal';
import { arrayOf } from '~/utils/arrayOf';

const meta = {
  title: 'Schedule/ScheduleModal',
  component: ScheduleModal,
} satisfies Meta<typeof ScheduleModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { openModal } = useModal();

    const handleOpen = () => {
      openModal();
    };

    return (
      <>
        {arrayOf(5).map((_, index) => {
          return (
            <div key={index} onClick={() => handleOpen()}>
              모달 열기
            </div>
          );
        })}
        <ScheduleModal
          scheduleId={1}
          position={{
            row: 0,
            column: 0,
            level: 0,
          }}
          onOpenScheduleEditModal={() => {
            console.log('onOpenScheduleEditModal');
          }}
        />
      </>
    );
  },
  args: {
    scheduleId: 1,
    position: {
      row: 0,
      column: 0,
      level: 0,
    },
  },
};
