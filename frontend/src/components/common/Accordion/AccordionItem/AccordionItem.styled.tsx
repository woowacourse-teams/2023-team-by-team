import styled from 'styled-components';

export const Container = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.GRAY300};

  &:last-child {
    border-bottom: none;
  }
`;
