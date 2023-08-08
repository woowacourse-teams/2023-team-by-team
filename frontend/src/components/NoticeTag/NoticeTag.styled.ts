import { styled, css } from 'styled-components';
import type { NoticeTagProps } from './NoticeTag';

export const TagContainer = styled.div<NoticeTagProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;

  width: ${({ size = 'md' }) => (size === 'md' ? '150px' : '42px')};
  height: 42px;

  border-radius: 18px;
  background-color: ${({ theme }) => theme.color.PRIMARY};

  box-shadow: 0 0 10px ${({ theme }) => theme.color.GRAY400};

  ${({ css }) => css}
`;

export const tagLabel = css`
  color: ${({ theme }) => theme.color.WHITE};
`;
