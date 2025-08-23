import axios from 'axios';
import { AuthResponse, Subscription, CreateSubscriptionDto, DashboardSummary, PreloadedSubscription } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },
};

// Subscriptions API
export const subscriptionsAPI = {
  getAll: async (): Promise<Subscription[]> => {
    const response = await api.get('/subscriptions');
    return response.data;
  },

  getById: async (id: string): Promise<Subscription> => {
    const response = await api.get(`/subscriptions/${id}`);
    return response.data;
  },

  create: async (data: CreateSubscriptionDto): Promise<Subscription> => {
    const response = await api.post('/subscriptions', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateSubscriptionDto>): Promise<Subscription> => {
    const response = await api.patch(`/subscriptions/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/subscriptions/${id}`);
  },
};

// Dashboard API
export const dashboardAPI = {
  getSummary: async (): Promise<DashboardSummary> => {
    const response = await api.get('/dashboard/summary');
    return response.data;
  },
};

// Preloaded Subscriptions API
export const preloadedSubscriptionsAPI = {
  getAll: async (): Promise<PreloadedSubscription[]> => {
    const response = await api.get('/preloaded-subscriptions');
    return response.data;
  },

  getByCategory: async (category: string): Promise<PreloadedSubscription[]> => {
    const response = await api.get(`/preloaded-subscriptions/category/${category}`);
    return response.data;
  },
};

export default api;
