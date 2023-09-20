import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '~/App';
import GlobalStyle from '~/styles/GlobalStyle';
import { theme } from './styles/theme';
import { worker } from '~/mocks/browser';
import { ToastProvider } from '~/components/common/Toast/ToastContext';
import ToastList from '~/components/common/Toast/ToastList';

if (process.env.WORKER === 'on') {
  worker.start();
}

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <GlobalStyle />
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <ToastList />
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
