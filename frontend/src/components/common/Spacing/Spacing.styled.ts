import styled, { css } from 'styled-components';
import type { SpacingProps } from '~/components/common/Spacing/Spacing';

export const SpacingRoot = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'direction'].includes(prop),
})<SpacingProps>`
  ${({ direction, size }) => {
    if (direction === 'vertical') {
      return css`
        width: 1px;
        height: ${size}px;
      `;
    }

    if (direction === 'horizontal') {
      return css`
        width: ${size}px;
        height: 1px;
      `;
    }
  }}
`;
