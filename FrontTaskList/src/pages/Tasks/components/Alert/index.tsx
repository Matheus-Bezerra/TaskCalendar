import { AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import { AlertDialogApp } from '../../../../components/AlertDialog';
import { AlertTaskProps } from './interfaces';

export const AlertTask = ({
  handleAlertDialog,
  handleRemoveTask,
  idTaskSelected,
  isLoadingDeletingTask,
  setHandleAlertDialog,
}: AlertTaskProps) => {
  return (
    <AlertDialogApp
      title="Remover tarefa"
      handleAlertDialog={handleAlertDialog}
      setHandleAlertDialog={setHandleAlertDialog}
    >
      <AlertDialogBody>
        Tem certeza que deseja excluir essa Tarefa?
      </AlertDialogBody>

      <AlertDialogFooter>
        <Button onClick={() => setHandleAlertDialog(!handleAlertDialog)}>
          Cancelar
        </Button>
        <Button
          colorScheme="red"
          onClick={() => handleRemoveTask(idTaskSelected)}
          ml={3}
          disabled={isLoadingDeletingTask}
        >
          Remover
        </Button>
      </AlertDialogFooter>
    </AlertDialogApp>
  );
};
