import { useEffect, useState } from "react";
import { Task } from "../../pages/Tasks/interfaces";
import { api } from "../../services/api";
import { useCallToast } from "../useToast";

export function useGetTasks(searchTask: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [foundTasks, setFoundTasks] = useState<Task[]>(tasks);
  const [isLoadingGetTasks, setIsLoadingGetTasks] = useState(false);
  const {sendToast} = useCallToast()

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
      sendToast('error', 'Houve algum problema para pegar as tarefas, tente novamente mais tarde!');
    } finally {
      setIsLoadingGetTasks(false);
    }
  }

  return {tasks, foundTasks, isLoadingGetTasks, setTasks}
}