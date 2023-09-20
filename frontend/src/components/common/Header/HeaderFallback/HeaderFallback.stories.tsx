import type { Meta, StoryObj } from '@storybook/react';
import HeaderFallback from '~/components/common/Header/HeaderFallback/HeaderFallback';

const meta = {
  title: 'Fallback/HeaderFallback',
  component: HeaderFallback,
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
