import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

export const Container = styled.div<{ $isOpen: boolean }>`
  cursor: pointer;

  ${({ $isOpen = false }) => {
    if ($isOpen)
      return css`
        outline: 3px ridge rgba(0, 46, 210, 0.381);
        border-radius: 2px;
      `;
  }}
  svg {
    transition: transform 0.2s ease-in-out;
    ${({ $isOpen = false }) => {
      if ($isOpen)
        return css`
          transform: rotate(-180deg);
        `;

      return css`
        transform: rotate(0);
      `;
    }}
  }
`;

export const accordionButton = ($padding: CSSProperties['padding']) => css`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  overflow-anchor: none;

  width: 100%;
  padding: ${$padding};
  text-align: left;

  border: 0;
  border-radius: 0;
`;

export const DisabledWrapper = styled.div<{
  $padding: CSSProperties['padding'];
}>`
  ${({ $padding }) => accordionButton($padding)}
`;
