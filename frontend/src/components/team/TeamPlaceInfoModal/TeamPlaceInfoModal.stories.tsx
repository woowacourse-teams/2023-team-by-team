import type { Meta, StoryObj } from '@storybook/react';
import Button from '~/components/common/Button/Button';
import TeamPlaceInfoModal from '~/components/team/TeamPlaceInfoModal/TeamPlaceInfoModal';
import { useModal } from '~/hooks/useModal';

const meta = {
  title: 'team/TeamPlaceInfoModal',
  component: TeamPlaceInfoModal,
  tags: ['autodocs'],
} satisfies Meta<typeof TeamPlaceInfoModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <TeamPlaceInfoModal />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: {},
};
