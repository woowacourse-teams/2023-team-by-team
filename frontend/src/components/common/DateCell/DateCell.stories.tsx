import type { Meta, StoryObj } from '@storybook/react';
import DateCell from '~/components/common/DateCell/DateCell';

const meta = {
  title: 'Calendar/DateCell',
  component: DateCell,
  tags: ['autodocs'],
} satisfies Meta<typeof DateCell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { rawDate: new Date(), currentMonth: 0 },
};
