import type { Meta, StoryObj } from '@storybook/react';
import TeamLinkAddModal from '~/components/team_link/TeamLinkAddModal/TeamLinkAddModal';
import { useModal } from '~/hooks/useModal';
import Button from '~/components/common/Button/Button';

const meta = {
  title: 'TeamLink/TeamLinkAddModal',
  component: TeamLinkAddModal,
  tags: ['autodocs'],
} satisfies Meta<typeof TeamLinkAddModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <TeamLinkAddModal />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: {},
};
