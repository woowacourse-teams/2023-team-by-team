import type { Meta, StoryObj } from '@storybook/react';
import FileDriveDecoration from './FileDriveDecoration';

/**
 * `FileDriveDecoration` 컴포넌트는 랜딩 페이지의 장식 컴포넌트인 `IntroCardPile` 의 세 번째 장면 해당하는 컴포넌트입니다.
 * **팀 드라이브**에 대한 모형을 애니메이션과 함께 보여줍니다.
 * 이 컴포넌트를 작성하는 시점에서, 팀 드라이브의 UI는 구상이 되어 있지 않았기에, 추후 구상이 완료될 경우 이 UI는 바뀔 수도 있습니다.
 */
const meta = {
  title: 'landing/FileDriveDecoration',
  component: FileDriveDecoration,
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
} satisfies Meta<typeof FileDriveDecoration>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 하늘색의 컨테이너는 본 컴포넌트에 포함되지 않습니다.
 */
export const Default: Story = {
  args: {},
};
