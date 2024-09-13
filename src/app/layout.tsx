'use client';

import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Router } from 'next/router';
import nProgress from 'nprogress';
import Head from 'next/head';
import ThemeProvider from '@/theme/ThemeProvider';
import { SnackbarProvider } from 'notistack';
import { ModalProvider } from '@/contexts';
import { CacheProvider } from '@emotion/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <html lang="pt">
      <Head>
        <title>Medcloud</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <SnackbarProvider
              maxSnack={6}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <body>{children}</body>
            </SnackbarProvider>
          </ModalProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </html>
  );
}
