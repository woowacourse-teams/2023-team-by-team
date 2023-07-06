import React from 'react';
import { ThemeProvider } from 'styled-components';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { handlers } from '../src/mocks/handlers/index';
import { theme } from '../src/styles/theme';
import GlobalStyle from '../src/styles/GlobalStyle';
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

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
  mswDecorator,
];

export default preview;
