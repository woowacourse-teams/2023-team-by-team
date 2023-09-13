import { css, styled } from 'styled-components';
import type { MenuItemProps } from '~/components/common/Menu/MenuItem/MenuItem';

export const Wrapper = styled.li<Omit<MenuItemProps, 'value'>>`
  position: relative;

  padding: 8px 26px;

  cursor: pointer;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY100};
  }

  &.selected {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }

  ${({ css }) => css}
`;

export const checkMark = css`
  position: absolute;
  left: 10px;
`;
