import type { Meta, StoryObj } from '@storybook/react';
import ScheduleEditModal from '~/components/ScheduleEditModal/ScheduleEditModal';
import Button from '~/components/common/Button/Button';
import { useModal } from '~/hooks/useModal';
import type { YYYYMMDDHHMM } from '~/types/schedule';

const meta = {
  title: 'Schedule/ScheduleEditModal',
  component: ScheduleEditModal,
  tags: ['autodocs'],
} satisfies Meta<typeof ScheduleEditModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <ScheduleEditModal
        teamPlaceName="Woowacourse TeamByTeam Corporation"
        scheduleId={1}
        initialSchedule={{
          id: 1,
          title: '일정 제목',
          startDateTime: '2023-08-01 00:00' as YYYYMMDDHHMM,
          endDateTime: '2023-08-01 00:00' as YYYYMMDDHHMM,
        }}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: {
    teamPlaceName: '',
    scheduleId: 1,
    initialSchedule: {
      id: 1,
      title: '일정 제목',
      startDateTime: '2023-08-01 00:00' as YYYYMMDDHHMM,
      endDateTime: '2023-08-01 00:00' as YYYYMMDDHHMM,
    },
  },
};
