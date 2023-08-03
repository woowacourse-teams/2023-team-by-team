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
import TeamCalendarPage from '~/components/pages/TeamCalendarPage/TeamCalendarPage';
import { ToastProvider } from '~/components/common/Toast/ToastContext';
import ToastList from '~/components/common/Toast/ToastList';
import FeedPage from '~/components/pages/FeedPage/FeedPage';
import { TeamPlaceProvider } from '~/contexts/TeamPlaceContext';
import TempLandingPage from '~/components/pages/TempLandingPage/TempLandingPage';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <TempLandingPage />,
      },
      {
        path: '/team-calendar',
        element: <TeamCalendarPage />,
      },
      {
        path: '/threads',
        element: <FeedPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <TeamPlaceProvider>
          <ToastProvider>
            <ModalProvider>
              <GlobalStyle />
              <RouterProvider router={router} />
              <ToastList />
            </ModalProvider>
          </ToastProvider>
        </TeamPlaceProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
