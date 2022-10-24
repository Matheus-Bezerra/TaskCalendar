import {
  ModalBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { ModalApp } from '../../../../components/Modal';
import { ModalCreateProps } from './interfaces';

export const ModalCreate = ({
  handleShowModalCreate,
  setHandleShowModalCreate,
  handleCreateNewTask,
  campsFormTask,
  changeValuesCampsTask,
  isLoadingCreatingTask,
}: ModalCreateProps) => {
  return (
    <ModalApp
      handleShowModal={handleShowModalCreate}
      setHandleShowModal={setHandleShowModalCreate}
      title="Crie sua tarefa"
    >
      <form onSubmit={handleCreateNewTask}>
        <ModalBody pb={6}>
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                isRequired
                value={campsFormTask.title}
                onChange={(e) => {
                  changeValuesCampsTask('title', e.target.value);
                }}
                datatype={'title'}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Descrição</FormLabel>
              <Input
                isRequired
                value={campsFormTask.description}
                onChange={(e) =>
                  changeValuesCampsTask('description', e.target.value)
                }
                datatype={'description'}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Data e hora do início</FormLabel>
              <Input
                type="datetime-local"
                isRequired
                value={String(campsFormTask.taskDateTime)}
                onChange={(e) =>
                  changeValuesCampsTask('taskDateTime', e.target.value)
                }
                datatype={'taskDateTime'}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Tempo de duração</FormLabel>
              <Input
                isRequired
                placeholder="Número de horas"
                value={campsFormTask.duration}
                onChange={(e) =>
                  changeValuesCampsTask('duration', e.target.value)
                }
                datatype={'duration'}
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            type="submit"
            disabled={isLoadingCreatingTask}
          >
            {isLoadingCreatingTask ? 'Carregando' : 'Adicionar'}
          </Button>
          <Button onClick={() => setHandleShowModalCreate(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </form>
    </ModalApp>
  );
};
