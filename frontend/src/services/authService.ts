import api from './api';
import { AuthResponse, User } from '../types';
import { jwtDecode } from 'jwt-decode';

// Service for authentication related API calls
const authService = {
  // Login user
  login: async (email: string, password: string): Promise<User> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      
      // Store token and user in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data.user;
    } catch (error) {
      throw error;
    }
  },
  
  // Register user
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    college?: string;
  }): Promise<User> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data.user;
  },
  
  // Logout user
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const decoded = jwtDecode(token);
      // Check if token is expired
      return (decoded.exp as number) * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  },
  
  // Get current user
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr) as User;
    } catch (error) {
      return null;
    }
  },
  
  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put<User>('/auth/profile', userData);
    
    // Update user in localStorage
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify({
        ...currentUser,
        ...response.data
      }));
    }
    
    return response.data;
  },
};

export default authService;