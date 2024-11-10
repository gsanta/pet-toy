'use client';
import useResponsive from '@/common/hooks/useResponsive';
// import SettingsPanel from '../../editor/components/settings/io/SettingsPanel';
import UserSettings from '../../user/components/UserSettings';
import {
  Box,
  Button,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
  Link,
} from '@chakra-ui/react';

import React from 'react';
import { FocusableElement } from '@chakra-ui/utils';

const Header = () => {
  const { isMobile } = useResponsive();
  const btnRef = React.useRef<FocusableElement | null>(null);

  return (
    <Box
      borderBottom="1px solid"
      borderColor="gray.600"
      display="flex"
      gap="1rem"
      justifyContent="flex-end"
      height="40px"
      paddingInline="1"
      paddingBlock="1"
    >
      {/* <SettingsPanel /> */}
      <UserSettings />
      {isMobile && (
        <DrawerRoot placement="end" finalFocusRef={btnRef}>
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
        // <IconButton
        //   aria-label="Open sidebar menu"
        //   colorScheme="orange"
        //   icon={<HamburgerIcon />}
        //   onClick={onDrawerOpen}
        //   size="sm"
        // />
      )}
    </Box>
  );
};

export default Header;
