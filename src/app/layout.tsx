'use client';

import Sidebar from '@/common/components/Sidebar/Sidebar';
import { AuthProvider } from './Providers';
import {
  Box,
  Button,
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import Header from '@/client/common/components/Header';
import theme from '@/client/common/themes/theme';
import Providers from '@/client/common/components/Providers';
import useResponsive from '@/common/hooks/useResponsive';
import Link from 'next/link';
import React from 'react';
import { FocusableElement } from '@chakra-ui/utils';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile } = useResponsive();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const btnRef = React.useRef<FocusableElement | null>(null);

  return (
    <html lang="en">
      <Box as="body">
        <Providers>
          <AuthProvider>
            <ChakraProvider theme={theme} cssVarsRoot="body">
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
                  <Header onDrawerOpen={onDrawerOpen} />
                </Box>
                {isMobile ? (
                  <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose} finalFocusRef={btnRef}>
                    <DrawerOverlay />
                    <DrawerContent>
                      <DrawerCloseButton />

                      <DrawerBody>
                        <Button as={Link} href="toys">
                          Toys
                        </Button>
                      </DrawerBody>
                    </DrawerContent>
                  </Drawer>
                ) : (
                  <Box as="aside" gridArea="sidebar">
                    <Sidebar />
                  </Box>
                )}
                <Box as="main" backgroundColor="orange.200" gridArea="main">
                  {children}
                </Box>
                <Box as="footer" bgColor="orange.600" gridArea="footer" height="40px"></Box>
              </Box>
            </ChakraProvider>
          </AuthProvider>
        </Providers>
      </Box>
    </html>
  );
};

export default RootLayout;
