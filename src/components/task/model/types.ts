export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  color: string;
  isCompleted: boolean;
}

export type TaskData = {
  title: string;
  description: string;
  category: string;
  color: string;
  date: string;
  time: string;
};
