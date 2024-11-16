'use client';
import useResponsive from '@/common/hooks/useResponsive';
// import SettingsPanel from '../../editor/components/settings/io/SettingsPanel';
import UserSettings from '../../user/components/UserSettings';
import { Box, Link } from '@chakra-ui/react';

import React from 'react';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { isMobile } = useResponsive();

  return (
    <Box
      as="header"
      background="white"
      borderBottom="1px solid"
      borderColor="gray.600"
      display="flex"
      gap="1rem"
      gridArea="header"
      height="50px"
      id="header"
      justifyContent="flex-end"
      paddingBlock="1"
      paddingInline="1"
      position="sticky"
      top="0"
      zIndex="1"
    >
      {/* <SettingsPanel /> */}
      <UserSettings />
      {isMobile && (
        <DrawerRoot placement="end">
          <DrawerBackdrop />
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm">
              Open
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerCloseTrigger />

            <DrawerBody>
              <Button as={Link} href="toys">
                Toys
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerRoot>
      )}
    </Box>
  );
};

export default Header;
