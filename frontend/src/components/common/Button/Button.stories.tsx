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

/**
 * `variant` 속성이 `plain` 인 경우, 버튼 색상이 `#fff`, 버튼의 레이블 색상이 `#191f28` 인 것 외에 다른 속성이 적용되지 않습니다.
 * 버튼에 따로 스타일을 적용해야 하는 경우에 사용하기 좋은 옵션입니다.
 */
export const Plain: Story = {
  args: {
    children: '아무 디자인이 없는 버튼',
    size: 'md',
    variant: 'plain',
  },
};

export const CustomPlainButton: Story = {
  args: {
    children: (
      <img
        src="https://www.svgrepo.com/show/525636/arrow-right.svg"
        width="80px"
      />
    ),
    size: 'md',
    variant: 'plain',
    css: {
      width: '100px',
      height: '100px',
    },
  },
};
