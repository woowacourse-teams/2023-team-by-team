import styled from 'styled-components';

export const Container = styled.svg<{ $fill?: string }>`
  path {
    fill: ${({ $fill }) => $fill || 'currentColor'};
  }
`;
