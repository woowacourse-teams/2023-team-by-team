import { styled, css } from 'styled-components';

export const Container = styled.li<{ size?: 'md' | 'sm' }>`
  flex-shrink: 0;

  width: ${({ size = 'md' }) => (size === 'md' ? '96px' : '76px')};
  height: ${({ size = 'md' }) => (size === 'md' ? '96px' : '76px')};

  border-radius: ${({ size = 'md' }) => (size === 'md' ? '12px' : '10px')};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 12px;

  object-fit: cover;
`;

export const viewButton = css`
  width: 100%;
  height: 100%;
  padding: 0;

  border-radius: 12px;
`;
