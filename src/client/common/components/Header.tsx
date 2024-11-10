'use client';
import useResponsive from '@/common/hooks/useResponsive';
// import SettingsPanel from '../../editor/components/settings/io/SettingsPanel';
import UserSettings from '../../user/components/UserSettings';
import { Box, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import React from 'react';

type HeaderProps = {
  onDrawerOpen(): void;
};

const Header = ({ onDrawerOpen }: HeaderProps) => {
  const { isMobile } = useResponsive();

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
        <IconButton
          aria-label="Open sidebar menu"
          colorScheme="orange"
          icon={<HamburgerIcon />}
          onClick={onDrawerOpen}
          size="sm"
        />
      )}
    </Box>
  );
};

export default Header;
