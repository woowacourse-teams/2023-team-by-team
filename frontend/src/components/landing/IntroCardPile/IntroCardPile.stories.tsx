import type { Meta, StoryObj } from '@storybook/react';
import IntroCardPile from './IntroCardPile';

/**
 * `IntroCardPile` 컴포넌트는 랜딩 페이지의 부속품에 해당하는 컴포넌트로,
 * 여러 장의 카드를 이용하여 팀바팀 서비스의 간략화된 UI를 미리 보여줍니다.
 * 랜딩 페이지의 왼쪽에 배치하여 메인 디자인 요소로 사용될 것입니다.
 */
const meta = {
  title: 'landing/IntroCardPile',
  component: IntroCardPile,
  tags: ['autodocs'],
} satisfies Meta<typeof IntroCardPile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

/**
 * 이 옵션은 랜딩 페이지와 동일한 배경을 보여주어야 하지만 애니메이션을 이용하여 사용자의 시선을 끌기에는 적합하지 않은 페이지에 적합합니다.
 *
 * 예를 들면, 팀 초대 링크를 입력하는 페이지가 있습니다.
 */
export const NoAnimation: Story = {
  args: {
    animation: false,
  },
};
