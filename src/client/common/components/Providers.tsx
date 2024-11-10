import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import system from '../themes/system';
import { SessionProvider } from 'next-auth/react';

type ProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
  },
});

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ChakraProvider value={system}>{children}</ChakraProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
