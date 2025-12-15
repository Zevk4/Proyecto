import { apiService } from './apiService';
import { Order } from '../types';

export const orderService = {
  getUserOrders: async (): Promise<Order[]> => {
    const response = await apiService.get<Order[]>('/orders');
    return response.data;
  },
};
