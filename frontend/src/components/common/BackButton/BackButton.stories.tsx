import type { Meta, StoryObj } from '@storybook/react';
import BackButton from './BackButton';

/**
 * `BackButton` 은 클릭하면 이전 페이지로 이동시키는 역할을 수행하는 버튼입니다.
 */
const meta = {
  title: 'common/BackButton',
  component: BackButton,
  tags: ['autodocs'],
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '뒤로가기',
  },
};
