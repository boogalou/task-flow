import { apiClient } from '../../../shared/lib/apiClietn.ts';
import { Task, TaskData } from '../model/types.ts';
import { AxiosResponse } from 'axios';

export class TaskApi {
  public async createTask(payload: TaskData): Promise<AxiosResponse<Task>> {
    return await apiClient.post('/tasks', payload);
  }

  public async updateTask(
    payload: Partial<TaskData & { id: number; isCompleted: boolean }>,
  ): Promise<AxiosResponse<Task>> {
    return await apiClient.patch(`/tasks/${payload.id}`, payload);
  }

  public async getTasks(): Promise<AxiosResponse<Task[]>> {
    return await apiClient.get('/tasks');
  }

  public async deleteTask(taskId: number): Promise<AxiosResponse> {
    return await apiClient.delete(`/tasks/${taskId}`);
  }
}

export const taskApi = new TaskApi();
