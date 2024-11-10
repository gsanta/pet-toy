'use client';

import { Box, Button, Link, useDisclosure } from '@chakra-ui/react';
import UserDialog from './UserDialog';
import { signOut, useSession } from 'next-auth/react';
import { toaster } from '@/components/ui/toaster';
import { Avatar } from '@/components/ui/avatar';

const UserSettings = () => {
  const { data: session } = useSession();

  const isLoggedIn = session?.user?.email;

  const { open: isUserDialogOpen, onOpen: onUserDialogOpen, onClose: onUserDialogClose } = useDisclosure();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toaster.create({
        description: 'Logged out successfully',
        position: 'top',
      });
    } catch {
      toaster.create({
        description: 'Failed to log out',
        position: 'top',
      });
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Box>
          <Button size="sm" variant="ghost" onClick={onUserDialogOpen}>
            <Avatar name="Dan Abrahmov" size="sm" />
          </Button>
          <Button size="sm" onClick={handleLogout}>
            Log out
          </Button>
        </Box>
      ) : (
        <Box>
          <Button as={Link} colorScheme="orange" href="/login" size="sm">
            Login
          </Button>
        </Box>
      )}
      <UserDialog isOpen={isUserDialogOpen} onClose={onUserDialogClose} />
    </>
  );
};

export default UserSettings;
