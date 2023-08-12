import type { Meta, StoryObj } from '@storybook/react';
import EmptyLinkPlaceholder from './EmptyLinkPlaceholder';

/**
 * `EmptyLinkPlaceholder` 는 `LinkTable` 컴포넌트에 있는 링크가 하나도 없을 경우, 대신 보여줄 화면을 구성하는 컴포넌트입니다.
 */
const meta = {
  title: 'link/EmptyLinkPlaceholder',
  component: EmptyLinkPlaceholder,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyLinkPlaceholder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
