import { styled } from 'styled-components';
import type { MenuListProps } from '~/components/common/Menu/MenuList/MenuList';

export const Wrapper = styled.ul<MenuListProps>`
  max-height: 200px;
  width: ${({ width }) => width};
  overflow-y: auto;

  border: 1px solid ${({ theme }) => theme.color.GRAY200};
  border-radius: 6px;
`;
