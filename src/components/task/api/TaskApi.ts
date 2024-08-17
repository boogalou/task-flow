import { apiClient } from '../../../shared/lib/apiClietn.ts';
import { Task, TaskData } from '../model/types.ts';

export class TaskApi {
  public async createTask(data: TaskData) {
    return await apiClient.post('/tasks', data);
  }

  public async updateTask(taskId: number, data: Partial<Task>) {
    return await apiClient.patch(`/tasks/${taskId}`, data);
  }
}
