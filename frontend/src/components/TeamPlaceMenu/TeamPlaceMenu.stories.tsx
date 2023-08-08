import type { Meta, StoryObj } from '@storybook/react';
import TeamPlaceMenu from '~/components/TeamPlaceMenu/TeamPlaceMenu';

const meta = {
  title: 'Common/TeamPlaceMenu',
  component: TeamPlaceMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof TeamPlaceMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    displayValue: '팀 선택하기',
    onClickMenu: () => {
      alert('Clicked!');
    },
  },
};
