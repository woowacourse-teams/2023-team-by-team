import type { Meta, StoryObj } from '@storybook/react';
import Modal from '~/components/common/Modal/Modal';
import { useModal } from '~/components/common/Modal/useModal';

const meta = {
  title: 'common/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ children }) => {
    const { openModal } = useModal();
    return (
      <>
        <button
          onClick={openModal}
          style={{
            width: '150px',
            padding: '16px',
            backgroundColor: '#333',
            color: 'white',
          }}
        >
          모달 열기
        </button>
        <Modal>
          <div
            style={{
              width: '400px',
              height: '250px',
              padding: '24px',
              backgroundColor: '#ddd',
            }}
          >
            모달 컨텐츠
          </div>
        </Modal>
      </>
    );
  },
};
