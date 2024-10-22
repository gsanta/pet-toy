import ErrorMessage from '@/client/common/components/ErrorMessage';
import useEmailLogin from '@/client/user/hooks/useEmailLogin';
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

const LoginForm = () => {
  const {
    form: { handleSubmit, formErrors, register },
    query: { loginEmail, loginEmailError, isLoginEmailLoding },
  } = useEmailLogin({});

  return (
    <Box as="form" minW="20rem" onSubmit={handleSubmit(loginEmail)}>
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
      <Box display="flex" flexDir="column" gap="0.5rem" marginTop="4" justifyContent="space-around">
        <Button colorScheme="orange" type="submit" isLoading={isLoginEmailLoding}>
          Log in with email
        </Button>
        {loginEmailError && (
          <ErrorMessage
            error={loginEmailError}
            fallbackMessage={
              loginEmailError?.response?.status === 401 ? 'Invalid email or password' : 'Failed to log in'
            }
          />
        )}
      </Box>

      <Box position="relative" paddingBlock="2rem">
        <Divider />
        <AbsoluteCenter px="4">OR</AbsoluteCenter>
      </Box>

      <Button colorScheme="blue" onClick={() => signIn('google')} width="100%">
        Log in with google
      </Button>

      <Box position="relative" paddingBlock="2rem">
        <Divider />
        <AbsoluteCenter px="4">OR</AbsoluteCenter>
      </Box>
      <Button as={Link} href="register" width="100%">
        Register
      </Button>
    </Box>
  );
};

export default LoginForm;
