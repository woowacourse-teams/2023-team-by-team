import type { Meta, StoryObj } from '@storybook/react';
import ScheduleModal from '~/components/team_calendar/ScheduleModal/ScheduleModal';
import { useModal } from '~/hooks/useModal';
import { arrayOf } from '~/utils/arrayOf';

const meta = {
  title: 'Schedule/ScheduleModal',
  component: ScheduleModal,
} satisfies Meta<typeof ScheduleModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const SampleModal = () => {
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
        calendarWidth={1000}
        calendarLeft={200}
        scheduleId={1}
        position={{
          row: 0,
          column: 0,
          level: 0,
        }}
        onOpenScheduleEditModal={() => {
          alert('onOpenScheduleEditModal');
        }}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: {
    calendarWidth: 1000,
    calendarLeft: 200,
    scheduleId: 1,
    position: {
      row: 0,
      column: 0,
      level: 0,
    },
  },
};
