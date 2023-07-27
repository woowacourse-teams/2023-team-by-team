import type { Meta, StoryObj } from '@storybook/react';
import { useModal } from '~/hooks/useModal';
import ScheduleAddModal from './ScheduleAddModal';
import Button from '~/components/common/Button/Button';

/**
 * `ScheduleAddModal` 컴포넌트는 일정 등록을 위한 폼을 포함하고 있는 모달 컴포넌트입니다.
 */
const meta = {
  title: 'Schedule/ScheduleAddModal',
  component: ScheduleAddModal,
  tags: ['autodocs'],
} satisfies Meta<typeof ScheduleAddModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <ScheduleAddModal
        teamPlaceName="Woowacourse TeamByTeam Corporation"
        clickedDate={new Date()}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: {
    teamPlaceName: '',
    clickedDate: new Date(),
  },
};
