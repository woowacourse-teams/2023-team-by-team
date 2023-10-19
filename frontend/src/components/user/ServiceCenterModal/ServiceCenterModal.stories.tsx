import type { Meta, StoryObj } from '@storybook/react';
import { useModal } from '~/hooks/useModal';
import Button from '~/components/common/Button/Button';
import ServiceCenterModal from '~/components/user/ServiceCenterModal/ServiceCenterModal';

/**
 * `ServiceCenterModal` 는 팀바팀 정보를 담고있는 모달입니다.
 */
const meta = {
  title: 'user/ServiceCenterModal',
  component: ServiceCenterModal,
  tags: ['autodocs'],
} satisfies Meta<typeof ServiceCenterModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <ServiceCenterModal
        onAccountDeleteButtonClick={() => alert('고객문의')}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: { onAccountDeleteButtonClick: () => alert('고객문의') },
};
