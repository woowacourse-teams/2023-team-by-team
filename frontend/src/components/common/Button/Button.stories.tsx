import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

/**
 * `Button` 컴포넌트는 공용 버튼 컴포넌트입니다.
 */
const meta = {
  title: 'common/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: '확인',
    size: 'md',
    variant: 'primary',
    onClick: () => alert('버튼이 클릭되었습니다!'),
  },
};

export const PrimaryLongMessage: Story = {
  args: {
    children: '네, 절차를 이해했으며 진행하기를 원합니다.',
    size: 'md',
    variant: 'primary',
  },
};

export const PrimaryLarge: Story = {
  args: {
    children: '확인',
    size: 'lg',
    variant: 'primary',
  },
};

export const PrimarySmall: Story = {
  args: {
    children: '확인',
    size: 'sm',
    variant: 'primary',
  },
};

export const PrimaryDisabled: Story = {
  args: {
    children: '확인',
    size: 'md',
    variant: 'primary',
    disabled: true,
  },
};

export const Normal: Story = {
  args: {
    children: '취소',
    size: 'md',
    variant: 'normal',
  },
};
