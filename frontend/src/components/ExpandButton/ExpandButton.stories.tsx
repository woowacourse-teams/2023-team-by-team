import type { Meta, StoryObj } from '@storybook/react';
import ExpandButton from './ExpandButton';

/**
 * `ExpandButton` 은 스레드 및 공지 스레드에서의 펼치기/접기 기능을 사용하기 위한 버튼입니다.
 *  기본적으로 `position: absolute` 가 적용되어 있으며 부모 요소의 최하단에 배치됩니다.
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
            padding: '120px',
            backgroundColor: '#404040',
            border: '1px solid #000',
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
export const NotExpanded: Story = {
  args: {
    isExpanded: false,
  },
};

export const Expanded: Story = {
  args: {
    isExpanded: true,
  },
};
