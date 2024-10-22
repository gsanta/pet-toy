'use client';

import Layout from '@/client/common/components/Layout';
import Providers from '@/client/common/components/Providers';
import theme from '@/client/common/themes/theme';
import { Box, ChakraProvider } from '@chakra-ui/react';
import LoginForm from './LoginForm';

const Page = () => {
  return (
    <Providers>
      <ChakraProvider theme={theme} cssVarsRoot="body">
        <Layout footer={<Box bgColor="orange.600" height="40px"></Box>}>
          <Box flex="1" display="flex" justifyContent="space-around" marginBlock="2rem">
            <LoginForm />
          </Box>
        </Layout>
      </ChakraProvider>
    </Providers>
  );
};

export default Page;
