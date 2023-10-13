import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const Container = styled.div<{ width: CSSProperties['width'] }>`
  width: ${({ width = 'auto' }) => width};

  border: 1px solid ${({ theme }) => theme.color.GRAY300};
  border-radius: 0.25rem;
`;
