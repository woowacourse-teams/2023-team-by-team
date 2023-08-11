import type { Meta, StoryObj } from '@storybook/react';
import FileDriveDecoration from './FileDriveDecoration';

/**
 * `FileDriveDecoration` 컴포넌트는 랜딩 페이지의 부속품에 해당하는 컴포넌트로,
 *
 * 여러 장의 카드를 이용하여 팀바팀 서비스의 간략화된 UI를 미리 보여줍니다.
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
