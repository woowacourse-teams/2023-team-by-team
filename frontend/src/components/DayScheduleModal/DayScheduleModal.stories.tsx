import type { Meta, StoryObj } from '@storybook/react';
import DayScheduleModal from '~/components/DayScheduleModal/DayScheduleModal';
import Button from '~/components/common/Button/Button';
import { useModal } from '~/hooks/useModal';

const meta = {
  title: 'DayScheduleModal',
  component: DayScheduleModal,
} satisfies Meta<typeof DayScheduleModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { openModal } = useModal();

    return (
      <>
        <Button onClick={openModal}>모달 열기</Button>
        <DayScheduleModal />
      </>
    );
  },
  args: {},
};
