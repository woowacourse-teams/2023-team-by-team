import type { Meta, StoryObj } from '@storybook/react';
import { useModal } from '~/hooks/useModal';
import Button from '~/components/common/Button/Button';
import UserInfoModal from '~/components/user/UserInfoModal/UserInfoModal';

const meta = {
  title: 'user/UserInfoModal',
  component: UserInfoModal,
  tags: ['autodocs'],
} satisfies Meta<typeof UserInfoModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <UserInfoModal onServiceCenterButtonClick={() => alert('고객문의')} />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: {
    onServiceCenterButtonClick: () => alert('고객문의'),
  },
};
