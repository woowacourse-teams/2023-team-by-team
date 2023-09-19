import type { Meta, StoryObj } from '@storybook/react';
import PageIndicator from '~/components/feed/PageIndicator/PageIndicator';

/**
 * `PageIndicator`는 현재 메뉴의 페이지가 몇 페이지인지를 시각적으로 표현하고, 페이지 전환 기능을 제공합니다. 슬라이드 쇼 등의 메뉴에서 사용하기에 적합합니다.
 * 검은색 컨테이너는 이 컴포넌트에 포함되지 않습니다.
 */
const meta = {
  title: 'common/PageIndicator',
  component: PageIndicator,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          backgroundColor: '#393939',
          height: '120px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PageIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pageCount: 4,
    currentPage: 1,
    onPageChange: (page: number) => {
      alert(`onPageChange(${page});`);
    },
  },
};
