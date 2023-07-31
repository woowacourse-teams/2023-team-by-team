import { styled } from 'styled-components';
import type { MenuItemProps } from '~/components/common/Menu/MenuItem/MenuItem';

export const Wrapper = styled.li<MenuItemProps>`
  padding: 8px 12px;

  cursor: pointer;

  text-align: center;

  ${({ css }) => css}

  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY100};
  }
`;
