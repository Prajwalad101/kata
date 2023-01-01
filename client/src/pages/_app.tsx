import { NextPage } from 'next';
import type { AppProps } from 'next/app';
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

  return getLayout(<Component {...pageProps} />, pageProps);
}

export default MyApp;
