import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Task } from "../../pages/Tasks/interfaces";
import { api } from "../../services/api";
import { useCallToast } from "../useToast";

interface useDeleteTasksProps {
  useTasks: [Task[], React.Dispatch<React.SetStateAction<Task[]>>]
  clearValues: () => void
  setHandleAlertDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export function useDeleteTasks({useTasks, clearValues, setHandleAlertDialog}: useDeleteTasksProps) {
  const [isLoadingDeletingTask, setIsLoadingDeletingTask] = useState(false);
  const {sendToast} = useCallToast()
  const [tasks, setTasks] = useTasks

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

  return {isLoadingDeletingTask, handleRemoveTask}
}