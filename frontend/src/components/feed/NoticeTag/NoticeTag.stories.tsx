import type { Meta, StoryObj } from '@storybook/react';
import NoticeTag from './NoticeTag';

/**
 * `NoticeTag` 는 공지 여부임을 표시하는 카테고리 컴포넌트입니다.
 */
const meta = {
  title: 'Feed/NoticeTag',
  component: NoticeTag,
  tags: ['autodocs'],
} satisfies Meta<typeof NoticeTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

/**
 * 이 사이즈는 모아보기 페이지에서 사용될 사이즈입니다.
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};
