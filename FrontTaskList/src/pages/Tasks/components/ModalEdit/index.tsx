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
import { ModalEditProps } from './interfaces';

export const ModalEdit = ({
  handleShowModalEdit,
  setHandleShowModalEdit,
  handleEditTask,
  campsFormTask,
  changeValuesCampsTask,
  isLoadingEditingTask,
}: ModalEditProps) => {
  return (
    <ModalApp
      handleShowModal={handleShowModalEdit}
      setHandleShowModal={setHandleShowModalEdit}
      title="Edite sua tarefa"
    >
      <form onSubmit={handleEditTask}>
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
            disabled={isLoadingEditingTask}
          >
            {isLoadingEditingTask ? 'Carregando' : 'Editar'}
          </Button>
          <Button onClick={() => setHandleShowModalEdit(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </form>
    </ModalApp>
  );
};
