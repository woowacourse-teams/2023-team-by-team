import styled from 'styled-components';

export const Container = styled.div<{ isOpen: boolean; height: number }>`
  overflow: hidden;
  height: ${({ isOpen, height }) => (isOpen ? height + 24 : 0)}px;
  padding: ${({ isOpen }) => (isOpen ? '10px 18px 12px' : '0 18px')};
  border-top: 1px solid ${({ theme }) => theme.color.GRAY300};

  transition: 0.35s ease;
`;
