import { styled } from 'styled-components';

export const MenuWrapper = styled.ul`
  max-height: 200px;
  width: 200px;
  overflow-y: auto;

  border: 1px solid ${({ theme }) => theme.color.GRAY200};
  border-radius: 6px;
`;

export const MenuItem = styled.li`
  padding: 8px 12px;
`;
