import { FormEvent, useEffect, useState } from 'react';
import { Box, Divider, Stack, Text, useToast } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { formatDate } from '../../utils/formatDateTimeHours';
import { api } from '../../services/api';
import axios, { AxiosError } from 'axios';
import { ModalEdit } from './components/ModalEdit';
import { ModalCreate } from './components/ModalCreate';
import { AlertTask } from './components/Alert';
import { TableContainerApp } from './components/TableContainer';
import { OptionsPage } from './components/OptionsPage';
import { InputSearch } from '../../components/form/InputSearch';
import { campsFormTaskProps, statusToastType, Task } from './interfaces';

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingGetTasks, setIsLoadingGetTasks] = useState(false);
  const [isLoadingDeletingTask, setIsLoadingDeletingTask] = useState(false);
  const [isLoadingCreatingTask, setIsLoadingCreatingTask] = useState(false);
  const [isLoadingEditingTask, setIsLoadingEditingTask] = useState(false);
  const [foundTasks, setFoundTasks] = useState<Task[]>(tasks);
  const [searchTask, setSearchTask] = useState('');
  const [idTaskSelected, setIdTaskSelected] = useState('');
  const [handleShowModalCreate, setHandleShowModalCreate] = useState(false);
  const [handleShowModalEdit, setHandleShowModalEdit] = useState(false);
  const [handleAlertDialog, setHandleAlertDialog] = useState(false);
  const [campsFormTask, setCampsFormTask] = useState<campsFormTaskProps>({
    title: '',
    description: '',
    taskDateTime: formatDate(new Date()),
    duration: 1,
  });
  const toast = useToast();
  let requestIsComplete = 0;

  useEffect(() => {
    setFoundTasks(
      tasks.filter((task) =>
        task.title.trim().toLowerCase().includes(searchTask.toLowerCase()),
      ),
    );
  }, [tasks, searchTask]);
  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    try {
      setIsLoadingGetTasks(true);
      const res = await api.get('/tasks');
      if (res.status === 200) setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingGetTasks(false);
    }
  }

  function clearValues() {
    setCampsFormTask({
      title: '',
      description: '',
      taskDateTime: formatDate(new Date()),
      duration: 1,
    });
    setSearchTask('');
  }

  function sendToast(status: statusToastType, message: string) {
    toast({
      title: `${message}`,
      status: status,
      variant: 'top-accent',
      position: 'top-right',
      isClosable: true,
    });
  }

  async function handleCreateNewTask(e: FormEvent) {
    try {
      e.preventDefault();
      setIsLoadingCreatingTask(true);
      const { title, description, taskDateTime, duration } = campsFormTask;
      if (
        title.length < 2 ||
        description.length < 2 ||
        !taskDateTime ||
        !duration.toString()
      )
        throw new Error('Preencha todos os campos corretamente');
      const response = await api.post('/tasks', {
        title,
        description,
        taskDateTime,
        duration,
        isComplete: false,
      });
      if (response.status === 201) {
        setTasks(response.data);
        clearValues();
        setHandleShowModalCreate(false);
        sendToast('success', 'Tarefa criada com sucesso');
      } else
        throw new Error(
          'Houve algum problema com a requisição tente novamente mais tarde',
        );
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (axios.isAxiosError(errors)) {
        if (errors?.response?.data?.Error) {
          sendToast('error', String(errors?.response?.data?.Error));
          return;
        }
        sendToast('error', String(errors.message));
        return;
      }
      sendToast('error', String(err));
    } finally {
      setIsLoadingCreatingTask(false);
    }
  }

  function handleToggleTaskCompletion(id: number | string) {
    clearTimeout(requestIsComplete);
    const changedTasks = tasks.map((task) => {
      if (task.id == id) task.isComplete = !task.isComplete;
      return task;
    });
    setTasks(changedTasks);
    requestIsComplete = setTimeout(async () => {
      const taskSelected = tasks.find((task) => task.id === id);
      const response = await api.patch(`/tasks/${id}`, {
        isComplete: taskSelected?.isComplete,
      });
    }, 550);
  }

  async function handleRemoveTask(id: number | string) {
    try {
      setIsLoadingDeletingTask(true);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 404)
        throw new Error('Tarefa não foi encontrada para remover');
      const differentTasks = tasks.filter((task) => task.id !== id);
      setTasks(differentTasks);
      clearValues();
      sendToast('success', 'Tarefa removida');
      setHandleAlertDialog(!handleRemoveTask);
    } catch (err) {
      console.error(err);
      const errors = err as Error | AxiosError;
      if (axios.isAxiosError(errors)) {
        if (errors.response?.status === 404) {
          sendToast('error', 'Tarefa não foi encontrada');
          return;
        }
        sendToast('error', errors.message);
        return;
      }
      sendToast('error', String(err));
    } finally {
      setIsLoadingDeletingTask(false);
    }
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

  async function handleEditTask(e: FormEvent) {
    try {
      setIsLoadingEditingTask(true);
      e.preventDefault();
      const { title, description, taskDateTime, duration } = campsFormTask;
      if (
        title.length < 2 ||
        description.length < 2 ||
        !taskDateTime ||
        !duration
      )
        throw new Error('Preencha todos os campos corretamente');
      const isCompleteTask = tasks.find(
        (task) => task.id === idTaskSelected,
      )?.isComplete;
      const response = await api.put(`/tasks/${idTaskSelected}`, {
        ...campsFormTask,
        isComplete: isCompleteTask ? isCompleteTask : false,
      });
      if (response.status === 204) {
        const changedTasks = tasks.map((task) => {
          if (task.id == idTaskSelected) {
            task.title = title;
            task.description = description;
            task.taskDateTime = taskDateTime;
            task.duration = duration;
          }
          return task;
        });
        setTasks(changedTasks);
        clearValues();
        sendToast('success', 'Tarefa editada');
        setHandleShowModalEdit(false);
        return;
      }
      throw new Error('Houve algum erro, tente novamente mais tarde!');
    } catch (err) {
      console.error(err);
      const errors = err as Error | AxiosError;
      if (axios.isAxiosError(errors)) {
        if (errors.response?.status === 404) {
          sendToast('error', 'Tarefa não foi encontrada');
          return;
        }
        sendToast('error', errors.message);
        return;
      }
      sendToast('error', String(err));
    } finally {
      setIsLoadingEditingTask(false);
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
