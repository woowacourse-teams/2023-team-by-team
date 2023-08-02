import React from 'react';
import { ThemeProvider } from 'styled-components';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { handlers } from '../src/mocks/handlers/index';
import { theme } from '../src/styles/theme';
import GlobalStyle from '../src/styles/GlobalStyle';
import { ModalProvider } from '../src/components/common/Modal/ModalContext';
import { ToastProvider } from '../src/components/common/Toast/ToastContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Preview } from '@storybook/react';

initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: handlers,
  },
};

const queryClient = new QueryClient();

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <ModalProvider>
            <GlobalStyle />
            <Story />
          </ModalProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  ),
  mswDecorator,
];

export default preview;
