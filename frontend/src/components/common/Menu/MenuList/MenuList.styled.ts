import { styled } from 'styled-components';
import type { MenuListProps } from '~/components/common/Menu/MenuList/MenuList';

export const Wrapper = styled.ul<MenuListProps>`
  position: absolute;

  max-height: 200px;
  width: ${({ width }) => width};
  overflow-y: auto;

  background-color: ${({ theme }) => theme.color.WHITE};

  border: 1px solid ${({ theme }) => theme.color.GRAY200};
  border-radius: 6px;

  z-index: ${({ theme }) => theme.zIndex.MENU};
`;
