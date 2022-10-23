import { useToast } from "@chakra-ui/react";
import { statusToastType } from "../pages/Tasks/interfaces";

export function useCallToast() {
  const toast = useToast();

  function sendToast(status: statusToastType, message: string) {
    toast({
      title: `${message}`,
      status: status,
      variant: 'top-accent',
      position: 'top-right',
      isClosable: true,
    });
  }

  return {sendToast}
}

