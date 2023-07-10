import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta = {
  title: 'common/Text',
  component: Text,
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const XxsNormal: Story = {
  args: {
    size: 'xxs',
    weight: 'normal',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const XxsBold: Story = {
  args: {
    size: 'xxs',
    weight: 'bold',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const XxsExtraBold: Story = {
  args: {
    size: 'xxs',
    weight: 'extraBold',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const XsNormal: Story = {
  args: {
    size: 'xs',
    weight: 'normal',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const XsBold: Story = {
  args: {
    size: 'xs',
    weight: 'bold',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const XsExtraBold: Story = {
  args: {
    size: 'xs',
    weight: 'extraBold',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const SmNormal: Story = {
  args: {
    size: 'sm',
    weight: 'normal',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const SmBold: Story = {
  args: {
    size: 'sm',
    weight: 'bold',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const SmExtraBold: Story = {
  args: {
    size: 'sm',
    weight: 'extraBold',
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

export const MdExtraBold: Story = {
  args: {
    size: 'md',
    weight: 'extraBold',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const LgNormal: Story = {
  args: {
    size: 'lg',
    weight: 'normal',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const LgBold: Story = {
  args: {
    size: 'lg',
    weight: 'bold',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const LgExtraBold: Story = {
  args: {
    size: 'lg',
    weight: 'extraBold',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const XlNormal: Story = {
  args: {
    size: 'xl',
    weight: 'normal',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const XlBold: Story = {
  args: {
    size: 'xl',
    weight: 'bold',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const XlExtraBold: Story = {
  args: {
    size: 'xl',
    weight: 'extraBold',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const XxlNormal: Story = {
  args: {
    size: 'xxl',
    weight: 'normal',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const XxlBold: Story = {
  args: {
    size: 'xxl',
    weight: 'bold',
    children: '안녕하세요 팀바팀입니다.',
  },
};

export const XxlExtraBold: Story = {
  args: {
    size: 'xxl',
    weight: 'extraBold',
    children: '안녕하세요 팀바팀입니다.',
  },
};
