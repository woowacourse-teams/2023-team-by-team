import type { Meta, StoryObj } from '@storybook/react';
import TeamCalendarDecoration from './TeamCalendarDecoration';

/**
 * `TeamCalendarDecoration` 컴포넌트는 랜딩 페이지의 장식 컴포넌트인 `IntroCardPile` 의 첫 번째 장면 해당하는 컴포넌트입니다.
 * **팀 캘린더**에 대한 모형을 애니메이션과 함께 보여줍니다.
 */
const meta = {
  title: 'landing/TeamCalendarDecoration',
  component: TeamCalendarDecoration,
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
} satisfies Meta<typeof TeamCalendarDecoration>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 하늘색의 컨테이너는 본 컴포넌트에 포함되지 않습니다.
 */
export const Default: Story = {
  args: {},
};

/**
 * 이 옵션은 이 컴포넌트가 주목을 끌어서는 안 되는 페이지에 사용하기에 적합합니다.
 * 랜딩 페이지를 제외한 페이지에서는 이 옵션이 사용될 것입니다.
 *
 * 참고로, 다른 `IntroCardPile` 의 장면들의 경우 이 옵션이 없는데,
 * 이는 `IntroCardPile` 에서 애니메이션을 보여주지 않는 옵션이 켜졌을 경우 다른 장면들은 랜더링될 일이 없기 때문입니다.
 */
export const NoAnimation: Story = {
  args: {
    animation: false,
  },
};
