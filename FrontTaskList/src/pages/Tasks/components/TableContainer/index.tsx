import React from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Checkbox,
  CircularProgress,
  Flex,
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { formatTableDate } from '../../../../utils/formatTableDate';
import { TableContainerProps } from './interfaces';

export const TableContainerApp = ({
  isLoading,
  dataItem,
  handleToggleTaskCompletion,
  setsFunctions,
  prepareEdit,
}: TableContainerProps) => {
  const { data, foundDataItem } = dataItem;
  const { setHandleAlertDialog, setIdTaskSelected } = setsFunctions;
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>
          {isLoading && (
            <Flex justify="center" w={'100%'} mb={3}>
              <CircularProgress isIndeterminate color="green.500" />
            </Flex>
          )}
          Quantidade de tarefas: {data.length > 0 ? data.length : 0}
        </TableCaption>
        <Thead>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th>Título</Th>
            <Th>Descrição</Th>
            <Th>Início</Th>
            <Th>Tempo de duração (horas)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {foundDataItem.map((task) => (
            <Tr key={task.id}>
              <Td>
                <Checkbox
                  colorScheme="blue"
                  bg="blue.400"
                  borderColor="transparent"
                  isChecked={task.isComplete}
                  id={task.id}
                  name={task.id}
                  onChange={() => {
                    handleToggleTaskCompletion(task.id);
                  }}
                />
              </Td>
              <Td id={task.id}>
                <DeleteIcon
                  color="red.400"
                  fontSize="20px"
                  onClick={() => {
                    setIdTaskSelected(task.id);
                    setHandleAlertDialog(true);
                  }}
                  cursor={'pointer'}
                />
                <EditIcon
                  color="green.500"
                  ml={3}
                  fontSize="20px"
                  onClick={() => prepareEdit(task.id)}
                  cursor={'pointer'}
                />
              </Td>
              <Td
                textDecorationLine={task.isComplete ? 'line-through' : 'none'}
              >
                {task.title}
              </Td>
              <Td
                textDecorationLine={task.isComplete ? 'line-through' : 'none'}
              >
                {task.description}
              </Td>
              <Td>{formatTableDate(String(task.taskDateTime))}</Td>
              <Td>{task.duration} </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
