import api from './api';
import { DashboardStats } from '../types';

// Service for dashboard related API calls
const dashboardService = {
  // Get dashboard statistics
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },
  
  // Get placement data for chart
  getPlacementData: async (): Promise<{ month: string; count: number }[]> => {
    const response = await api.get<{ month: string; count: number }[]>('/dashboard/placements');
    return response.data;
  },
  
  // Get top companies by placements
  getTopCompanies: async (): Promise<{ company: string; placements: number }[]> => {
    const response = await api.get<{ company: string; placements: number }[]>('/dashboard/top-companies');
    return response.data;
  },
};

export default dashboardService;