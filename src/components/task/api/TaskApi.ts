import { apiClient } from '../../../shared/lib/apiClietn.ts';
import { Task, TaskData } from '../model/types.ts';
import { AxiosResponse } from 'axios';

export class TaskApi {
  public async createTask(data: TaskData): Promise<AxiosResponse<Task>> {
    return await apiClient.post('/tasks', data);
  }

  public async updateTask(taskId: number, data: Partial<Task>): Promise<AxiosResponse<Task>> {
    try {
      return await apiClient.patch(`/tasks/${taskId}`, data);
    } catch (err) {
      console.error(err);
      throw new Error(`${err}`);
    }
  }

  public async getTasks(): Promise<AxiosResponse<Task[]>> {
    try {
      return await apiClient.get('/tasks');
    } catch (err) {
      console.error(err);
      throw new Error(`${err}`);
    }
  }

  public async deleteTasks(taskId: number): Promise<AxiosResponse> {
    try {
      return await apiClient.delete(`/tasks/${taskId}`);
    } catch (err) {
      console.error(err);
      throw new Error(`${err}`);
    }
  }
}

export const taskApi = new TaskApi();
