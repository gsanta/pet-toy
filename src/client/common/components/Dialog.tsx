import {
  DialogRoot as Modal,
  DialogBackdrop as ModalOverlay,
  DialogContent as ModalContent,
  DialogCloseTrigger as ModalCloseButton,
  DialogBody as ModalBody,
  DialogBodyProps as ModalBodyProps,
  HStack,
  DialogFooter as ModalFooter,
  DialogFooterProps as ModalFooterProps,
  HTMLChakraProps,
  Box,
  DialogHeader,
  Text,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { BiX } from 'react-icons/bi';

export type DialogProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose(): void;
  title: string;
} & Omit<HTMLChakraProps<'section'>, 'scrollBehavior'>;

export type DialogBodyProps = ModalBodyProps;

export const DialogBody = (props: DialogBodyProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <ModalBody paddingBlockEnd="2" {...(props as any)} />;
};

export type DialogFooterProps = ModalFooterProps;

export const DialogFooter = ({ children, ...rest }: DialogFooterProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <ModalFooter paddingInline="2" paddingTop="0" {...(rest as any)}>
      <HStack justifyContent="end">{children}</HStack>
    </ModalFooter>
  );
};

export const DialogButtons = ({ children, ...rest }: DialogFooterProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <ModalFooter paddingInline="2" {...(rest as any)}>
      <HStack justifyContent="end">
        <Box>{children}</Box>
      </HStack>
    </ModalFooter>
  );
};

const Dialog = ({ children, isOpen, onClose, title, ...rest }: DialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ModalContent {...(rest as any)} bgColor="chakra-body-bg">
        <DialogHeader>
          <Text as="h1" color="gray.300" size="3" textTransform="uppercase">
            {title}
          </Text>
        </DialogHeader>
        <ModalCloseButton>
          <BiX size={30} />
        </ModalCloseButton>
        {children}
      </ModalContent>
    </Modal>
  );
};

export default Dialog;
