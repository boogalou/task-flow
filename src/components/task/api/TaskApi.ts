import { apiClient } from '../../../shared/lib/apiClietn.ts';
import { Task, TaskData } from '../model/types.ts';

export class TaskApi {
  public async createTask(data: TaskData) {
    try {
      return await apiClient.post('/tasks', data);
    } catch (err) {
      console.error(err);
    }
  }

  public async updateTask(taskId: number, data: Partial<Task>) {
    try {
      return await apiClient.patch(`/tasks/${taskId}`, data);
    } catch (err) {
      console.error(err);
    }
  }
}

export const taskApi = new TaskApi();
