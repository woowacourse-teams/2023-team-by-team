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
      <UserInfoModal onAccountDeleteButtonClick={() => alert('회원탈퇴')} />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: {
    onAccountDeleteButtonClick: () => alert('회원탈퇴'),
  },
};
