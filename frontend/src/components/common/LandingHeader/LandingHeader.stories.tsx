import type { Meta, StoryObj } from '@storybook/react';
import LandingHeader from '~/components/common/LandingHeader/LandingHeader';

/**
 * `LandingHeader` 팀플레이스 페이지가 아닌 페이지에서 사용될 간략화된 헤더 컴포넌트입니다.
 */
const meta = {
  title: 'common/LandingHeader',
  component: LandingHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof LandingHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
