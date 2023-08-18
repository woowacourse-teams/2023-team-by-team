import type { Meta, StoryObj } from '@storybook/react';
import EmptyFeedPlaceholder from './EmptyFeedPlaceholder';

/**
 * `EmptyFeedPlaceholder` 는 `ThreadList` 컴포넌트에 있는 링크가 하나도 없을 경우, 대신 보여줄 화면을 구성하는 컴포넌트입니다.
 */
const meta = {
  title: 'Link/EmptyFeedPlaceholder',
  component: EmptyFeedPlaceholder,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyFeedPlaceholder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
