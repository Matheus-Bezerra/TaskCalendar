import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { campsFormTaskProps, Task } from "../../pages/Tasks/interfaces";
import { api } from "../../services/api";
import { useCallToast } from "../useToast";

interface useCreateTaskProps {
  useTasks: [Task[], React.Dispatch<React.SetStateAction<Task[]>>]
  clearValues: () => void
  setHandleShowModalCreate: React.Dispatch<React.SetStateAction<boolean>>
  campsFormTask: campsFormTaskProps
}

export function useCreateTasks({useTasks, clearValues, setHandleShowModalCreate, campsFormTask}: useCreateTaskProps) {
  const [isLoadingCreatingTask, setIsLoadingCreatingTask] = useState(false);
  const {sendToast} = useCallToast()
  const [tasks, setTasks] = useTasks

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

  return {isLoadingCreatingTask, handleCreateNewTask}
}