import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-components';
import Menu from '~/components/common/Menu/Menu';
import MenuButton from '~/components/common/Menu/MenuButton/MenuButton';
import MenuItem from '~/components/common/Menu/MenuItem/MenuItem';
import MenuList from '~/components/common/Menu/MenuList/MenuList';

const meta = {
  title: 'common/Menu',
  component: Menu,
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Menu>
        <Menu.Button
          css={css`
            background-color: #516fff;
            width: 100px;
            height: 50px;
            border-radius: 4px;
            color: #fff;
          `}
        >
          메뉴 열기
        </Menu.Button>
        <Menu.List>
          <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
          <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
          <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
        </Menu.List>
      </Menu>
    );
  },
};
