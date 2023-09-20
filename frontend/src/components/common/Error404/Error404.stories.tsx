import type { Meta, StoryObj } from '@storybook/react';
import Error404 from './Error404';

/**
 * `Error404`는 404 에러 페이지에서 사용되는 컴포넌트입니다.
 */
const meta = {
  title: 'common/Error404',
  component: Error404,
  tags: ['autodocs'],
  argTypes: {
    isLoggedIn: {
      description:
        '사용자의 로그인 여부를 의미합니다. 이 값에 따라 사용자에게 안내해 주는 페이지가 달라집니다.',
    },
  },
} satisfies Meta<typeof Error404>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
  },
};

export const NotLoggedIn: Story = {
  args: {
    isLoggedIn: false,
  },
};
