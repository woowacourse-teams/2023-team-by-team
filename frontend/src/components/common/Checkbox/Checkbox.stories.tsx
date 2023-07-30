import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { css } from 'styled-components';

/**
 * `Checkbox`는 대부분의 상황에서 사용할 수 있는 공용 체크박스 컴포넌트입니다.
 */
const meta = {
  title: 'common/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {
    isChecked: true,
    onChange: () =>
      alert(
        '체크박스의 onChange 이벤트가 실행되었습니다! 추후 이 이벤트를 핸들링해 state를 변경한다면, 체크박스도 바뀔 것입니다!',
      ),
  },
};

export const MediumNotChecked: Story = {
  args: {
    isChecked: false,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    isChecked: true,
  },
};

export const SmallNotChecked: Story = {
  args: {
    size: 'sm',
    isChecked: false,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    isChecked: true,
  },
};

export const LargeNotChecked: Story = {
  args: {
    size: 'lg',
    isChecked: false,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    isChecked: true,
  },
};

export const ExtraLargeNotChecked: Story = {
  args: {
    size: 'xl',
    isChecked: false,
  },
};

export const CustomColor: Story = {
  args: {
    size: 'md',
    isChecked: true,
    color: '#ff8888',
  },
};

export const CustomStyle: Story = {
  args: {
    size: 'xl',
    isChecked: true,
    css: css`
      width: 70px;
      height: 50px;

      border: none;
      background: linear-gradient(45deg, #00ffe5, #2600ff, #ff0ff7);
    `,
  },
};
