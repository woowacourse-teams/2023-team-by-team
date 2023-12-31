import type { Meta, StoryObj } from '@storybook/react';
import TeamLinkTable from './LinkTable';

/**
 * `LinkTable` 는 팀 링크 목록을 표시할 메뉴 컴포넌트입니다.
 */
const meta = {
  title: 'Link/TeamLinkTable',
  component: TeamLinkTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          height: '500px',
          padding: '30px',
          backgroundColor: '#e9e9e9',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TeamLinkTable>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 회색 배경은 컴포넌트를 고정시키고 크기를 조절하기 위해 사용한 것으로, 컴포넌트에는 포함되지 않습니다.
 */
export const Default: Story = {
  args: {},
};
