import { apiClient } from '../../../shared/lib/axiosSettings.ts';
import { AxiosResponse } from 'axios';
import { Task, CreateTaskRequest } from '../../../shared/types/types.ts';

export class TaskApi {
  public async createTask(payload: CreateTaskRequest): Promise<AxiosResponse<Task>> {
    return await apiClient.post('/tasks', payload);
  }

  public async updateTask(
    payload: Partial<Task & { id: number; isCompleted: boolean }>,
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
