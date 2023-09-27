import type { Meta, StoryObj } from '@storybook/react';
import AccountDeleteModal from './AccountDeleteModal';
import { useModal } from '~/hooks/useModal';
import Button from '~/components/common/Button/Button';

/**
 * `AccountDeleteModal` 는 계정 탈퇴 진행을 위한 모달입니다.
 */
const meta = {
  title: 'user/AccountDeleteModal',
  component: AccountDeleteModal,
  tags: ['autodocs'],
} satisfies Meta<typeof AccountDeleteModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <AccountDeleteModal />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: {},
};
