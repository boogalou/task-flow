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
    try {
      console.log(payload);
      return await apiClient.patch(`/tasks/${payload.id}`, payload);
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
