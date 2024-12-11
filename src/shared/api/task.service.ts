import { apiClient } from 'shared/api/base-api.ts';
import { AxiosResponse } from 'axios';
import { Task, CreateTaskRequest } from 'shared/types/types.ts';

class TaskService {
  public async getTasks(): Promise<AxiosResponse<Task[]>> {
    return apiClient.get(`/tasks`);
  }

  public async createTask(payload: CreateTaskRequest): Promise<AxiosResponse<Task>> {
    return apiClient.post(`/tasks`, payload);
  }

  public async updateTask(payload: Task): Promise<AxiosResponse<Task>> {
    return apiClient.patch(`/tasks/${payload.id}`, payload);
  }

  public async deleteTask(taskId: number): Promise<AxiosResponse> {
    return apiClient.delete(`/tasks/${taskId}`);
  }
}

export const taskService = new TaskService();
