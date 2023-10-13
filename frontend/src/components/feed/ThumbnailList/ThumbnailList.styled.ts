import { styled, css } from 'styled-components';

export const Container = styled.ul<{ mode: 'delete' | 'view' }>`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  column-gap: 12px;

  width: 100%;
  height: 116px;

  ${({ mode }) =>
    mode === 'view'
      ? css`
          overflow-x: auto;
          overflow-y: hidden;

          padding-bottom: 20px;
        `
      : css`
          overflow-x: visible;
        `}
`;
