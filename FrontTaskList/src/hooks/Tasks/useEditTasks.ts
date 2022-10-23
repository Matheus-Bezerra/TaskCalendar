import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { campsFormTaskProps, Task } from "../../pages/Tasks/interfaces";
import { api } from "../../services/api";
import { useCallToast } from "../useToast";

interface useEditTaskProps {
  useTasks: [Task[], React.Dispatch<React.SetStateAction<Task[]>>]
  clearValues: () => void
  setHandleShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>
  idTaskSelected: string
  campsFormTask: campsFormTaskProps
}

export function useEditTasks({useTasks, clearValues, setHandleShowModalEdit, idTaskSelected, campsFormTask}: useEditTaskProps) {
  const [isLoadingEditingTask, setIsLoadingEditingTask] = useState(false);
  const [tasks, setTasks] = useTasks
  const {sendToast} = useCallToast()
  let requestIsComplete = 0;

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

  return {isLoadingEditingTask, handleEditTask, handleToggleTaskCompletion}
}