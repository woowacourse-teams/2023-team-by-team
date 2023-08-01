import type { Meta, StoryObj } from '@storybook/react';
import Button from '~/components/common/Button/Button';
import Modal from '~/components/common/Modal/Modal';
import { useModal } from '~/hooks/useModal';
import Text from '~/components/common/Text/Text';

const meta = {
  title: 'common/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { openModal } = useModal();

    return (
      <>
        <Button onClick={openModal}>모달 열기</Button>
        <Modal>
          <div
            style={{
              width: '400px',
              height: '250px',
              padding: '24px',
              backgroundColor: '#ddd',
            }}
          >
            <Text>모달 컨텐츠</Text>
          </div>
        </Modal>
      </>
    );
  },
};
