import React, { ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

interface ModalProps {
  title: string;
  setHandleShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowModal: boolean;
  children: ReactNode;
}

export function ModalApp({
  children,
  title,
  handleShowModal,
  setHandleShowModal,
}: ModalProps) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={handleShowModal}
        onClose={() => {
          setHandleShowModal(!handleShowModal);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          {children}
        </ModalContent>
      </Modal>
    </>
  );
}
