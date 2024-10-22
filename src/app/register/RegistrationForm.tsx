import ErrorMessage from '@/client/common/components/ErrorMessage';
import useEmailSignUp from '@/client/user/hooks/useEmailSignUp';
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const RegistrationForm = () => {
  const {
    form: { handleSubmit, formErrors, register },
    query: { registerEmail, registerEmailError, isRegisterEmailLoading },
  } = useEmailSignUp({ onClose: () => {} });

  return (
    <Box as="form" minW="20rem" onSubmit={handleSubmit(registerEmail)}>
      <FormControl isInvalid={Boolean(formErrors.email)}>
        <FormLabel>Email</FormLabel>
        <Input {...register('email')} />
        <FormErrorMessage>{formErrors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(formErrors.password)}>
        <FormLabel>Password</FormLabel>
        <Input type="password" {...register('password')} />
        <FormErrorMessage>{formErrors.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(formErrors.passwordConfirmation)}>
        <FormLabel>Password Confirmation</FormLabel>
        <Input type="password" {...register('passwordConfirmation')} />
        <FormErrorMessage>{formErrors.passwordConfirmation?.message}</FormErrorMessage>
      </FormControl>
      <Button
        colorScheme="orange"
        type="submit"
        isLoading={isRegisterEmailLoading}
        marginBlockStart="1rem"
        width="100%"
      >
        Register with email
      </Button>
      {registerEmailError && (
        <ErrorMessage
          error={registerEmailError}
          fallbackMessage={
            registerEmailError?.response?.status === 401 ? 'Invalid email or password' : 'Failed to log in'
          }
        />
      )}

      <Box position="relative" paddingBlock="2rem">
        <Divider />
        <AbsoluteCenter px="4">OR</AbsoluteCenter>
      </Box>

      <Button colorScheme="blue" onClick={() => signIn('google')} width="100%">
        Register with google
      </Button>

      <Box position="relative" paddingBlock="2rem">
        <Divider />
        <AbsoluteCenter px="4">OR</AbsoluteCenter>
      </Box>

      <Button as={Link} href="login" width="100%">
        Log in
      </Button>
    </Box>
  );
};

export default RegistrationForm;
