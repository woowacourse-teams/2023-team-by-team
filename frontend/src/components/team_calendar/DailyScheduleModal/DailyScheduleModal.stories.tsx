import type { Meta, StoryObj } from '@storybook/react';
import DailyScheduleModal from '~/components/team_calendar/DailyScheduleModal/DailyScheduleModal';
import Button from '~/components/common/Button/Button';
import { useModal } from '~/hooks/useModal';
import type { SchedulePosition } from '~/types/schedule';

const meta = {
  title: 'Schedule/DailyScheduleModal',
  component: DailyScheduleModal,
  tags: ['autodocs'],
} satisfies Meta<typeof DailyScheduleModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <DailyScheduleModal
        onScheduleModalOpen={({ scheduleId, row, column, level }) =>
          alert(`${scheduleId}, ${row}, ${column}, ${level}`)
        }
        onSetModalType={() => alert('hi')}
        position={{ row: 0, column: 0 }}
        rawDate={new Date()}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
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
