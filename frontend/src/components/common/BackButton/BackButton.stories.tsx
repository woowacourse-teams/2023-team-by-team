import type { Meta, StoryObj } from '@storybook/react';
import BackButton from './BackButton';
import { PATH_NAME } from '~/constants/routes';

/**
 * `BackButton` 은 왼쪽 화살표가 있는 디자인의 버튼으로, 클릭 시 특정 주소로 이동시키는 역할을 수행하는 버튼입니다.
 * 기본적으로 이전 페이지로 이동시키며, 특정 주소를 명시하면 그 주소로 이동합니다. **단, 이 주소는 팀바팀 내의 주소여야 합니다.**
 */
const meta = {
  title: 'common/BackButton',
  component: BackButton,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: '버튼에 보이게 할 텍스트입니다.',
    },
    href: {
      description:
        '클릭 시 어느 주소로 이동시킬 것인지를 여기에 명시해 주시면 됩니다. **단, 이 주소는 팀바팀 내의 주소여야 합니다.** 명시되지 않을 경우 버튼이 클릭되면 이전 페이지로 이동시킵니다.',
    },
  },
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '뒤로가기',
  },
};

export const HrefSpecified: Story = {
  args: {
    label: '모아보기 페이지로 이동',
    href: PATH_NAME.TEAM_OVERVIEW,
  },
};
