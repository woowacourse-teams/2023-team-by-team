import type { Meta, StoryObj } from '@storybook/react';
import ImageAddButton from './ImageAddButton';

/**
 * `ImageAddButton` 은 채팅에서 이미지 등록을 위해 사용하는 버튼입니다.
 */
const meta = {
  title: 'feed/ImageAddButton',
  component: ImageAddButton,
  tags: ['autodocs'],
} satisfies Meta<typeof ImageAddButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {
      alert('onClick()');
    },
  },
};
