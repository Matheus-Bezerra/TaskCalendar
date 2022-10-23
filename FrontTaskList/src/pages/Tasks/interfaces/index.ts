export interface Task {
  id: string;
  title: string;
  description: string;
  taskDateTime: string | Date;
  duration: number | string;
  isComplete: boolean;
}

export type campsFormTaskProps = Omit<Task, 'id' | 'isComplete'>;

export type statusToastType = 'success' | 'error' | 'warning' | 'info';