'use client';

import Sidebar from '@/common/components/Sidebar/Sidebar';
import { Box } from '@chakra-ui/react';
import Header from '@/client/common/components/Header';
import Providers from '@/client/common/components/Providers';
import useResponsive from '@/common/hooks/useResponsive';
import React, { ReactNode } from 'react';

const Content = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useResponsive();

  return (
    <Box
      display="grid"
      gridTemplateAreas={[
        `'header header' 'main main' 'footer footer'`,
        `'header header' 'sidebar main' 'footer footer'`,
      ]}
      gridTemplateRows="auto 1fr auto"
      gridTemplateColumns="250px 1fr"
      minH="100vh"
    >
      <Box as="header" gridArea="header" id="header">
        <Header />
      </Box>
      {!isMobile && (
        <Box as="aside" gridArea="sidebar">
          <Sidebar />
        </Box>
      )}
      <Box as="main" backgroundColor="orange.200" gridArea="main">
        {children}
      </Box>
      <Box as="footer" bgColor="orange.600" gridArea="footer" height="40px"></Box>
    </Box>
  );
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <html lang="en">
        <Box as="body">
          <Content>{children}</Content>
        </Box>
      </html>
    </Providers>
  );
};

export default RootLayout;
