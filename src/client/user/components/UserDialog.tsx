import { Avatar } from '@/components/ui/avatar';
import Dialog, { DialogBody } from '../../common/components/Dialog';
import api from '../../common/utils/api';
import { usersPath } from '../../common/utils/routes';
import { Box, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

type UserDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

const UserDialog = ({ isOpen, onClose }: UserDialogProps) => {
  const { data } = useSession();

  const {
    mutateAsync: mutateDeleteUser,
    isError: isDeleteUserError,
    isPending: isDeleteUserLoading,
  } = useMutation<unknown, AxiosError<unknown>, unknown>({
    mutationFn: async () => {
      const resp = await api.delete(usersPath);

      return resp;
    },
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="User">
      <DialogBody padding="1rem">
        <Box display="flex" justifyContent="center" gap="1rem" alignItems="center">
          <Avatar name={data?.user?.email || ''} /> <Text maxW="200px">{data?.user?.email}</Text>
        </Box>
        <Box display="flex" justifyContent="space-around" marginTop="1rem">
          <Field errorText="Failed to delete user" isInvalid={isDeleteUserError} width="initial">
            <Button colorScheme="red" onClick={mutateDeleteUser} loading={isDeleteUserLoading}>
              Delete account
            </Button>
          </Field>
        </Box>
      </DialogBody>
    </Dialog>
  );
};

export default UserDialog;
