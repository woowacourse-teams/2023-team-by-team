import type { Meta, StoryObj } from '@storybook/react';
import ThreadExpandButton from './ThreadExpandButton';

/**
 * `ThreadExpandButton` 은 스레드 및 공지 스레드에서의 펼치기/접기 기능을 사용하기 위한 버튼입니다.
 *  **더 이상 이 컴포넌트는 `position: absolute`를 지니지 않도록 변경되었음에 유의하세요.**
 */
const meta = {
  title: 'Feed/ThreadExpandButton',
  component: ThreadExpandButton,
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
} satisfies Meta<typeof ThreadExpandButton>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 검은 배경은 단지 컴포넌트의 랜더링 결과 잘 보이게 하기 위함이며, 실제로는 컴포넌트에 포함되지 않습니다.
 */
export const NotExpanded: Story = {
  args: {
    isExpanded: false,
    isMe: false,
  },
};

export const Expanded: Story = {
  args: {
    isExpanded: true,
    isMe: false,
  },
};

export const Small: Story = {
  args: {
    isExpanded: false,
    isMe: false,
    size: 'sm',
  },
};

export const NotExpandedAndSentByMe: Story = {
  args: {
    isExpanded: false,
    isMe: true,
  },
};

export const ExpandedAndSentByMe: Story = {
  args: {
    isExpanded: true,
    isMe: true,
  },
};

export const SmallAndSentByMe: Story = {
  args: {
    isExpanded: false,
    isMe: true,
    size: 'sm',
  },
};
