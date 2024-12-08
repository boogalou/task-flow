import { AxiosResponse, isAxiosError } from 'axios';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

export abstract class BaseService {
  protected async handleRequest<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
    try {
      const response = await request;
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        throw error;
      }
    }
    throw error;
  }
}
