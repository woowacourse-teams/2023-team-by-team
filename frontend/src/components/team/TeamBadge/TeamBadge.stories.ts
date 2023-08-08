import type { Meta, StoryObj } from '@storybook/react';
import TeamBadge from '~/components/team/TeamBadge/TeamBadge';

const meta = {
  title: 'common/TeamBadge',
  component: TeamBadge,
  tags: ['autodocs'],
} satisfies Meta<typeof TeamBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    teamPlaceColor: 0,
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    teamPlaceColor: 0,
    size: 'sm',
  },
};

export const Middle: Story = {
  args: {
    teamPlaceColor: 0,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    teamPlaceColor: 0,
    size: 'lg',
  },
};
