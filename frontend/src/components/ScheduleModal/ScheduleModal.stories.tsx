import type { Meta, StoryObj } from '@storybook/react';
import Button from '~/components/common/Button/Button';
import { useModal } from '~/hooks/useModal';
import ScheduleModal from '~/components/ScheduleModal/ScheduleModal';

const meta = {
  title: 'ScheduleModal',
  component: ScheduleModal,
} satisfies Meta<typeof ScheduleModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { openModal } = useModal();

    return (
      <>
        <Button onClick={openModal}>모달 열기</Button>
        <ScheduleModal id={1} />
      </>
    );
  },

  args: {
    id: 1,
  },
};
