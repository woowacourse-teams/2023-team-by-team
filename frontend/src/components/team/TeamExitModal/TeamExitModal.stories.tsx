import type { Meta, StoryObj } from '@storybook/react';
import Button from '~/components/common/Button/Button';
import TeamExitModal from '~/components/team/TeamExitModal/TeamExitModal';
import { useModal } from '~/hooks/useModal';

const meta = {
  title: 'team/TeamExitModal',
  component: TeamExitModal,
  tags: ['autodocs'],
} satisfies Meta<typeof TeamExitModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal, closeModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <TeamExitModal onClose={closeModal} />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: {},
};
