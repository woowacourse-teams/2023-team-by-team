import type { Meta, StoryObj } from '@storybook/react';
import Button from '~/components/common/Button/Button';
import TeamColorEditModal from '~/components/team/TeamColorEditModal/TeamColorEditModal';
import { useModal } from '~/hooks/useModal';

const meta = {
  title: 'team/TeamColorEditModal',
  component: TeamColorEditModal,
  tags: ['autodocs'],
} satisfies Meta<typeof TeamColorEditModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <TeamColorEditModal />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: {},
};
