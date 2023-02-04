import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { QueryProvider } from 'src/components/context-provider';
import ToastProvider from 'src/layouts/ToastProvider/ToastProvider';
import '../styles/globals.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (
    _page: React.ReactElement,
    _pageProps: unknown
  ) => React.ReactNode;
};

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <QueryProvider>
      <ToastProvider>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </ToastProvider>
    </QueryProvider>
  );
}

export default MyApp;
