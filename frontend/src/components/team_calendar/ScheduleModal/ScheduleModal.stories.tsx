import type { Meta, StoryObj } from '@storybook/react';
import Button from '~/components/common/Button/Button';
import ScheduleModal from '~/components/team_calendar/ScheduleModal/ScheduleModal';
import { useModal } from '~/hooks/useModal';

const meta = {
  title: 'Schedule/ScheduleModal',
  component: ScheduleModal,
  tags: ['autodocs'],
} satisfies Meta<typeof ScheduleModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
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
