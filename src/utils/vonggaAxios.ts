import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

class VonggaAxios {
  private static instance: VonggaAxios;
  private axiosInstance: AxiosInstance;
  private isRefreshing: boolean = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_VONGGA_API_URL || 'http://localhost:8080/api',
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  public static getInstance(): VonggaAxios {
    if (!VonggaAxios.instance) {
      VonggaAxios.instance = new VonggaAxios();
    }
    return VonggaAxios.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: any) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;
        if (!originalRequest) {
          return Promise.reject(error);
        }

        // If error is not 401 or request already retried, reject
        if (error.response?.status !== 401 || (originalRequest as any)._retry) {
          return Promise.reject(error);
        }

        if (!this.isRefreshing) {
          this.isRefreshing = true;
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            const response = await axios.post<RefreshTokenResponse>(
              `${this.axiosInstance.defaults.baseURL}/auth/refresh`,
              { refreshToken }
            );

            const { accessToken, refreshToken: newRefreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            // Notify all subscribers about the new token
            this.refreshSubscribers.forEach((callback) => callback(accessToken));
            this.refreshSubscribers = [];

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // If refresh token is invalid, clear tokens and redirect to login
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // If currently refreshing, add request to queue
        return new Promise((resolve) => {
          this.refreshSubscribers.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(this.axiosInstance(originalRequest));
          });
        });
      }
    );
  }

  // Public methods to access axios instance
  public get<T>(url: string, config = {}) {
    return this.axiosInstance.get<T>(url, config);
  }

  public post<T>(url: string, data = {}, config = {}) {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public put<T>(url: string, data = {}, config = {}) {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public delete<T>(url: string, config = {}) {
    return this.axiosInstance.delete<T>(url, config);
  }

  public patch<T>(url: string, data = {}, config = {}) {
    return this.axiosInstance.patch<T>(url, data, config);
  }
}

// Export singleton instance
export const vonggaAxios = VonggaAxios.getInstance();

// Export type for responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}