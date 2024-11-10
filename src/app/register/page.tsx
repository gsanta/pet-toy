'use client';

import { Box } from '@chakra-ui/react';
import RegistrationForm from './RegistrationForm';

const Page = () => {
  return (
    <Box flex="1" display="flex" justifyContent="space-around" marginBlock="2rem">
      <RegistrationForm />
    </Box>
  );
};

export default Page;
