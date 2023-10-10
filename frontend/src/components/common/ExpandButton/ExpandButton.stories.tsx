import type { Meta, StoryObj } from '@storybook/react';
import ExpandButton from './ExpandButton';

/**
 * `ExpandButton` 은 스레드 및 공지 스레드에서의 펼치기/접기 기능을 사용하기 위한 버튼입니다.
 *  **더 이상 이 컴포넌트는 `position: absolute`를 지니지 않도록 변경되었음에 유의하세요.**
 */
const meta = {
  title: 'Feed/ExpandButton',
  component: ExpandButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            position: 'relative',
            padding: '40px',
            backgroundColor: '#404040',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof ExpandButton>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 검은 배경은 단지 컴포넌트의 랜더링 결과 잘 보이게 하기 위함이며, 실제로는 컴포넌트에 포함되지 않습니다.
 */
export const WhiteNotExpanded: Story = {
  args: {
    isExpanded: false,
    theme: 'white',
  },
};

export const WhiteExpanded: Story = {
  args: {
    isExpanded: true,
    theme: 'white',
  },
};

export const WhiteSmall: Story = {
  args: {
    isExpanded: false,
    theme: 'white',
    size: 'sm',
  },
};

export const BlurpleNotExpanded: Story = {
  args: {
    isExpanded: false,
    theme: 'blurple',
  },
};

export const BlurpleExpanded: Story = {
  args: {
    isExpanded: true,
    theme: 'blurple',
  },
};

export const BlurpleSmall: Story = {
  args: {
    isExpanded: false,
    theme: 'blurple',
    size: 'sm',
  },
};
