import { styled, css } from 'styled-components';

export const Container = styled.ul<{
  $mode: 'delete' | 'view';
  $size: 'md' | 'sm' | undefined;
}>`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  column-gap: 12px;

  width: 100%;

  ${({ $mode, $size }) => {
    if ($mode === 'view')
      if ($size === 'sm')
        return css`
          overflow-x: auto;
          overflow-y: hidden;
        `;
      else
        return css`
          height: 116px;

          overflow-x: auto;
          overflow-y: hidden;

          padding-bottom: 20px;
        `;
    else
      return css`
        height: 116px;

        overflow-x: visible;
      `;
  }}
`;
