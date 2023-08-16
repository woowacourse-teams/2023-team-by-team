import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta = {
  title: 'common/Text',
  component: Text,
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MdLight: Story = {
  args: {
    size: 'md',
    weight: 'light',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const MdNormal: Story = {
  args: {
    size: 'md',
    weight: 'normal',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const MdBold: Story = {
  args: {
    size: 'md',
    weight: 'bold',
    children: '안녕하세요 팀바팀입니다.',
  },
};
