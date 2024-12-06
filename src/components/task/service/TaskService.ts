import { apiClient } from '../../../shared/lib/axiosSettings.ts';
import { AxiosResponse } from 'axios';
import { Task, CreateTaskRequest } from '../../../shared/types/types.ts';

class TaskService {
  public async createTask(payload: CreateTaskRequest): Promise<AxiosResponse<Task>> {
    return apiClient.post(`/tasks`, payload);
  }

  public async updateTask(payload: Task, userId: number): Promise<AxiosResponse<Task>> {
    return apiClient.patch(`/tasks/${payload.id}`, payload);
  }

  public async getTasks(userId: number): Promise<AxiosResponse<Task[]>> {
    return apiClient.get(`/tasks`);
  }

  public async deleteTask(taskId: number, userId: number): Promise<AxiosResponse> {
    return apiClient.delete(`/tasks/${taskId}`);
  }
}

export const taskService = new TaskService();
