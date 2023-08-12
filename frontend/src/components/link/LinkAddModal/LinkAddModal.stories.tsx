import type { Meta, StoryObj } from '@storybook/react';
import LinkAddModal from '~/components/link/LinkAddModal/LinkAddModal';
import { useModal } from '~/hooks/useModal';
import Button from '~/components/common/Button/Button';

const meta = {
  title: 'Link/LinkAddModal',
  component: LinkAddModal,
  tags: ['autodocs'],
} satisfies Meta<typeof LinkAddModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <LinkAddModal />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: {},
};
