import { StrictMode, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from '~/App';
import GlobalStyle from '~/styles/GlobalStyle';
import { theme } from './styles/theme';
import { worker } from '~/mocks/browser';
import { ToastProvider } from '~/components/common/Toast/ToastContext';
import ToastList from '~/components/common/Toast/ToastList';
import { useToast } from '~/hooks/useToast';
import { TokenProvider } from '~/contexts/TokenContext';

if (process.env.WORKER === 'on') {
  worker.start();
}

const _QueryClientProvider = ({ children }: { children: ReactNode }) => {
  const { showToast } = useToast();
  const [queryClient] = useState(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError: (errorResponse, query) => {
          if (!(errorResponse instanceof Response)) {
            return;
          }

          const { status } = errorResponse;
          const customErrorMessage = query.meta?.errorMessage;

          if (typeof customErrorMessage === 'string') {
            showToast('error', customErrorMessage);
            return;
          }

          if (status >= 500) {
            showToast('error', '네트워크 통신 중 에러가 발생했습니다.');
          }
        },
      }),
    });
  });

  useEffect(() => {
    return () => {
      queryClient.clear();
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <TokenProvider>
          <_QueryClientProvider>
            <GlobalStyle />
            <BrowserRouter>
              <App />
            </BrowserRouter>
            <ToastList />
            <ReactQueryDevtools initialIsOpen={false} />
          </_QueryClientProvider>
        </TokenProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
