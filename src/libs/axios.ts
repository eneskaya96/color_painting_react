import axios from 'axios';

import { BACKEND_API_URL } from '@/utils/environmentUtils';

const api = axios.create({
  baseURL: BACKEND_API_URL,
});

if (typeof window !== 'undefined') {
  api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error),
  );
  api.interceptors.response.use((response) => {
    return response.data;
  });
}

export interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message?: string;
  success: boolean;
}

export enum HttpMethod {
  Delete = 'DELETE',
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
}

export default api;
