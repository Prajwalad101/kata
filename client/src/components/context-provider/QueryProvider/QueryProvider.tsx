import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface QueryProviderProps {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps?: any;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

function QueryProvider({ children, pageProps }: QueryProviderProps) {
  let component;
  if (pageProps) {
    component = <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>;
  } else {
    component = children;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {component}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default QueryProvider;
