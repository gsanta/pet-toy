'use client';

import { Box } from '@chakra-ui/react';
import LoginForm from './LoginForm';

const Page = () => {
  return (
    <Box flex="1" display="flex" justifyContent="space-around" marginBlock="2rem">
      <LoginForm />
    </Box>
  );
};

export default Page;
