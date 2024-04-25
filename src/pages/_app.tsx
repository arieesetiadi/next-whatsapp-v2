import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '@/components/layouts/main-layout';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
}
