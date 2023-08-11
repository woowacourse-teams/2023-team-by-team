import type { Meta, StoryObj } from '@storybook/react';
import FeedDecoration from './FeedDecoration';

/**
 * `FeedDecoration` 컴포넌트는 랜딩 페이지의 장식 컴포넌트인 `IntroCardPile` 의 두 번째 장면 해당하는 컴포넌트입니다.
 * **팀 피드**에 대한 모형을 애니메이션과 함께 보여줍니다.
 */
const meta = {
  title: 'landing/FeedDecoration',
  component: FeedDecoration,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            position: 'relative',

            width: '640px',
            height: '910px',

            backgroundColor: '#d1ddff',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof FeedDecoration>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 하늘색의 컨테이너는 본 컴포넌트에 포함되지 않습니다.
 */
export const Default: Story = {
  args: {},
};
