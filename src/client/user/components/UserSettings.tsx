'use client';

import { Avatar, Button, ButtonGroup, Link, useDisclosure, useToast } from '@chakra-ui/react';
import UserDialog from './UserDialog';
import { signOut, useSession } from 'next-auth/react';

const UserSettings = () => {
  const toast = useToast();
  const { data: session } = useSession();

  const isLoggedIn = session?.user?.email;

  const { isOpen: isUserDialogOpen, onOpen: onUserDialogOpen, onClose: onUserDialogClose } = useDisclosure();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast({
        title: 'Logged out successfully',
        position: 'top',
      });
    } catch {
      toast({
        title: 'Failed to log out',
        position: 'top',
      });
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <ButtonGroup>
          <Button size="sm" variant="ghost" onClick={onUserDialogOpen}>
            <Avatar name="Dan Abrahmov" size="sm" />
          </Button>
          <Button size="sm" onClick={handleLogout}>
            Log out
          </Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <Button as={Link} colorScheme="orange" href="/login" size="sm">
            Login
          </Button>
        </ButtonGroup>
      )}
      <UserDialog isOpen={isUserDialogOpen} onClose={onUserDialogClose} />
    </>
  );
};

export default UserSettings;
