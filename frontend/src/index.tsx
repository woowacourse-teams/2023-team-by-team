import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '~/App';
import GlobalStyle from '~/styles/GlobalStyle';
import { theme } from './styles/theme';
import { worker } from '~/mocks/browser';
import { ModalProvider } from '~/components/common/Modal/ModalContext';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ModalProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
