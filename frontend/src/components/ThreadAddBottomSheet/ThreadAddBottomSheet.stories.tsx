import type { Meta, StoryObj } from '@storybook/react';
import ThreadAddBottomSheet from '~/components/ThreadAddBottomSheet/ThreadAddBottomSheet';
import Button from '~/components/common/Button/Button';
import { useModal } from '~/hooks/useModal';

const meta = {
  title: 'Thread/ThreadAddBottomSheet',
  component: ThreadAddBottomSheet,
} satisfies Meta<typeof ThreadAddBottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

const Example = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>바텀시트 열기</Button>
      <ThreadAddBottomSheet />
    </>
  );
};

export const Default: Story = {
  render: () => <Example />,
  args: {},
};
