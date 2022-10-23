import React, { ReactNode } from 'react';

import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

interface AlertDialogProps {
  title: string;
  setHandleAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleAlertDialog: boolean;
  children: ReactNode;
}

export function AlertDialogApp({
  title,
  children,
  handleAlertDialog,
  setHandleAlertDialog,
}: AlertDialogProps) {
  return (
    <>
      <AlertDialog
        isOpen={handleAlertDialog}
        onClose={() => {
          setHandleAlertDialog(!handleAlertDialog);
        }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            {children}
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
