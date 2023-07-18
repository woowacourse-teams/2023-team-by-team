import Input from './Input';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * `Input` 은 공용 인풋 컴포넌트입니다.
 *
 * <b>이 컴포넌트는 확정되지 않은 임시 공용 컴포넌트입니다. 추후 컴포넌트의 재작성이 필요합니다.</b>
 */
const meta = {
  title: 'common/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '200px',
    height: '50px',
    placeholder: '예시 인풋입니다',
  },
};
