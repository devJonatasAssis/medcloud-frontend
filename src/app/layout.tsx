'use client';

import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { Router } from 'next/router';
import nProgress from 'nprogress';
import Head from 'next/head';
import ThemeProvider from '@/theme/ThemeProvider';
import { SnackbarProvider } from 'notistack';
import { ModalProvider } from '@/contexts';
import { AuthProvider } from '@/contexts/authContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    Router.events.on('routeChangeStart', nProgress.start);
    Router.events.on('routeChangeError', nProgress.done);
    Router.events.on('routeChangeComplete', nProgress.done);

    return () => {
      Router.events.off('routeChangeStart', nProgress.start);
      Router.events.off('routeChangeError', nProgress.done);
      Router.events.off('routeChangeComplete', nProgress.done);
    };
  }, []);

  return (
    <html>
      <Head>
        <title>Medcloud</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <body>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ModalProvider>
                <SnackbarProvider
                  maxSnack={6}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  {children}
                </SnackbarProvider>
              </ModalProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
