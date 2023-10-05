import { StrictMode } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import App from '~/App';
import GlobalStyle from '~/styles/GlobalStyle';
import { theme } from './styles/theme';
import { worker } from '~/mocks/browser';
import { ToastProvider } from '~/components/common/Toast/ToastContext';
import ToastList from '~/components/common/Toast/ToastList';
import { useToast } from '~/hooks/useToast';

if (process.env.WORKER === 'on') {
  worker.start();
}

const _QueryClientProvider = ({ children }: { children: ReactNode }) => {
  const { showToast } = useToast();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (error instanceof Error) {
          const customErrorMessage = query.meta?.errorMessage;

          if (typeof customErrorMessage === 'string') {
            showToast('error', customErrorMessage);
            return;
          }

          showToast('error', error.message);
        }
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <_QueryClientProvider>
          <GlobalStyle />
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <ToastList />
        </_QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
