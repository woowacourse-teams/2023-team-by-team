import type { Meta, StoryObj } from '@storybook/react';
import Button from '~/components/common/Button/Button';
import NotificationListModal from '~/components/feed/NotificationListModal/NotificationListModal';
import { useModal } from '~/hooks/useModal';

const meta = {
  title: 'Feed/NotificationListModal',
  component: NotificationListModal,
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationListModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <NotificationListModal />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: {},
};
