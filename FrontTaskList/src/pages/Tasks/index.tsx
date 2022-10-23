import { useState } from 'react';
import { Box, Divider, Stack } from '@chakra-ui/react';
import { formatDate } from '../../utils/formatDateTimeHours';
import { ModalEdit } from './components/ModalEdit';
import { ModalCreate } from './components/ModalCreate';
import { AlertTask } from './components/Alert';
import { TableContainerApp } from './components/TableContainer';
import { OptionsPage } from './components/OptionsPage';
import { InputSearch } from '../../components/form/InputSearch';
import { campsFormTaskProps } from './interfaces';
import { useGetTasks } from '../../hooks/Tasks/useGetTasks';
import { useDeleteTasks } from '../../hooks/Tasks/useDeleteTasks';
import { useEditTasks } from '../../hooks/Tasks/useEditTasks';
import { useCreateTasks } from '../../hooks/Tasks/useCreateTasks';

const initialValuesCampsTask = {
  title: '',
  description: '',
  taskDateTime: formatDate(new Date()),
  duration: 1,
};

export const Tasks = () => {
  const [searchTask, setSearchTask] = useState('');
  const [idTaskSelected, setIdTaskSelected] = useState('');
  const [handleShowModalCreate, setHandleShowModalCreate] = useState(false);
  const [handleShowModalEdit, setHandleShowModalEdit] = useState(false);
  const [handleAlertDialog, setHandleAlertDialog] = useState(false);
  const [campsFormTask, setCampsFormTask] = useState<campsFormTaskProps>(
    initialValuesCampsTask,
  );

  // My Hooks
  const { tasks, setTasks, foundTasks, isLoadingGetTasks } =
    useGetTasks(searchTask);

  const { handleRemoveTask, isLoadingDeletingTask } = useDeleteTasks({
    useTasks: [tasks, setTasks],
    clearValues: clearValues,
    setHandleAlertDialog: setHandleAlertDialog,
  });

  const { handleEditTask, isLoadingEditingTask, handleToggleTaskCompletion } =
    useEditTasks({
      useTasks: [tasks, setTasks],
      clearValues: clearValues,
      setHandleShowModalEdit: setHandleShowModalEdit,
      campsFormTask: campsFormTask,
      idTaskSelected: idTaskSelected,
    });

  const { handleCreateNewTask, isLoadingCreatingTask } = useCreateTasks({
    useTasks: [tasks, setTasks],
    clearValues: clearValues,
    setHandleShowModalCreate: setHandleShowModalCreate,
    campsFormTask: campsFormTask,
  });

  // functions calls
  function clearValues() {
    setCampsFormTask(initialValuesCampsTask);
    setSearchTask('');
  }

  function changeValuesCampsTask(
    dataType: keyof campsFormTaskProps,
    value: string,
  ) {
    switch (dataType) {
      case 'title':
        setCampsFormTask({ ...campsFormTask, title: value });
        break;
      case 'description':
        setCampsFormTask({ ...campsFormTask, description: value });
        break;
      case 'taskDateTime':
        setCampsFormTask({ ...campsFormTask, taskDateTime: value });
        break;
      case 'duration':
        setCampsFormTask({ ...campsFormTask, duration: value });
        break;
    }
  }

  function prepareEdit(id: string | number) {
    setIdTaskSelected(String(id));
    const taskSelected = tasks.find((task) => task.id === id);
    if (taskSelected) {
      const { title, description, taskDateTime, duration } = taskSelected;
      setCampsFormTask({ title, description, taskDateTime, duration });
      setHandleShowModalEdit(true);
    }
  }

  return (
    <Box as="main" p={[4, 6, 12]}>
      <ModalCreate
        campsFormTask={campsFormTask}
        isLoadingCreatingTask={isLoadingCreatingTask}
        changeValuesCampsTask={changeValuesCampsTask}
        handleCreateNewTask={handleCreateNewTask}
        handleShowModalCreate={handleShowModalCreate}
        setHandleShowModalCreate={setHandleShowModalCreate}
      />
      <ModalEdit
        campsFormTask={campsFormTask}
        isLoadingEditingTask={isLoadingEditingTask}
        changeValuesCampsTask={changeValuesCampsTask}
        handleEditTask={handleEditTask}
        handleShowModalEdit={handleShowModalEdit}
        setHandleShowModalEdit={setHandleShowModalEdit}
      />
      <Stack bg="white" borderRadius={4} p={6} spacing={4}>
        <OptionsPage
          campsFormTask={campsFormTask}
          clearValues={clearValues}
          setsFunction={{
            setCampsFormTask: setCampsFormTask,
            setHandleShowModalCreate: setHandleShowModalCreate,
          }}
        />
        <Divider />
        <Box as="section">
          <InputSearch
            data={searchTask}
            setData={setSearchTask}
            placeholder="Pesquise uma tarefa pelo título"
          />
        </Box>
        <Box as="main">
          <TableContainerApp
            dataItem={{ data: tasks, foundDataItem: foundTasks }}
            isLoading={isLoadingGetTasks}
            handleToggleTaskCompletion={handleToggleTaskCompletion}
            setsFunctions={{
              setHandleAlertDialog: setHandleAlertDialog,
              setIdTaskSelected: setIdTaskSelected,
            }}
            prepareEdit={prepareEdit}
          />
          <AlertTask
            handleAlertDialog={handleAlertDialog}
            handleRemoveTask={handleRemoveTask}
            idTaskSelected={idTaskSelected}
            isLoadingDeletingTask={isLoadingDeletingTask}
            setHandleAlertDialog={setHandleAlertDialog}
          />
        </Box>
      </Stack>
    </Box>
  );
};
