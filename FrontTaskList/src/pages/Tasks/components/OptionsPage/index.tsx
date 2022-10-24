import { Flex, Button, Text } from '@chakra-ui/react';
import { formatDate } from '../../../../utils/formatDateTimeHours';
import { OptionsPageProps } from './interfaces';

export const OptionsPage = ({
  campsFormTask,
  clearValues,
  setsFunction,
  isVisibleCharts,
}: OptionsPageProps) => {
  const { setCampsFormTask, setHandleShowModalCreate, setIsVisibleCharts } =
    setsFunction;
  return (
    <Flex as="header" justify="space-between" gap={4} flexWrap={'wrap'}>
      <Flex gap={5} align="center">
        <Text as={'h2'} fontSize={'2xl'}>
          Tarefas
        </Text>
        <Button
          bg={'green.600'}
          color="white"
          _hover={{ bg: 'green.700' }}
          onClick={() => {
            setIsVisibleCharts((state) => !state);
          }}
        >
          {!isVisibleCharts ? 'Ver gráfico' : 'Ver tabela'}
        </Button>
      </Flex>
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
