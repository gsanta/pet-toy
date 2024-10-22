'use client';

import Header from '@/client/common/components/Header';
import Layout from '@/client/common/components/Layout';
import Providers from '@/client/common/components/Providers';
import theme from '@/client/common/themes/theme';
import { Box, ChakraProvider } from '@chakra-ui/react';

const Page = async () => {
  return (
    <Providers>
      <ChakraProvider theme={theme} cssVarsRoot="body">
        <Layout header={<Header />} footer={<Box bgColor="orange.600" height="40px"></Box>}>
          <>Content</>
        </Layout>
      </ChakraProvider>
    </Providers>
  );
};

export default Page;
