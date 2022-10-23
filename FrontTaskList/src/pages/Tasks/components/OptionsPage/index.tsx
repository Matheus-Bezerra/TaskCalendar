import { Flex, Button, Text } from '@chakra-ui/react';
import { formatDate } from '../../../../utils/formatDateTimeHours';
import { OptionsPageProps } from './interfaces';

export const OptionsPage = ({
  campsFormTask,
  clearValues,
  setsFunction,
}: OptionsPageProps) => {
  const { setCampsFormTask, setHandleShowModalCreate } = setsFunction;
  return (
    <Flex as="header" justify="space-between">
      <Text as={'h2'} fontSize={'2xl'}>
        Tarefas
      </Text>
      <Button
        bg={'blue.400'}
        color="white"
        _hover={{ bg: 'blue.700' }}
        onClick={() => {
          setCampsFormTask({
            ...campsFormTask,
            taskDateTime: formatDate(new Date()),
          });
          clearValues();
          setHandleShowModalCreate(true);
        }}
      >
        Adicionar tarefa
      </Button>
    </Flex>
  );
};
