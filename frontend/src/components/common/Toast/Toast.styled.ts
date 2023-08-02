import { styled } from 'styled-components';
import type { ToastProps } from '~/components/common/Toast/Toast';

export const Wrapper = styled.div<Pick<ToastProps, 'status' | 'isActive'>>`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 50px;
  padding: 16px 16px;

  border-radius: 4px;

  ${({ status, theme }) => {
    switch (status) {
      case 'success':
        return `
          background-color: ${theme.color.PRIMARY};
          color: ${theme.color.WHITE};
        `;
      case 'error':
        return `
          background-color: ${theme.color.RED};
          color: ${theme.color.WHITE};
        `;
    }
  }}

  animation: ${({ theme, isActive }) =>
    isActive ? theme.animation.fadeInUp : theme.animation.fadeOut}
    0.4s ease-in-out both;
`;