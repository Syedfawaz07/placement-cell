import api from './api';
import { Interview } from '../types';

// Service for interview related API calls
const interviewService = {
  // Get all interviews
  getAllInterviews: async (): Promise<Interview[]> => {
    const response = await api.get<Interview[]>('/interviews');
    return response.data;
  },
  
  // Get interview by ID
  getInterviewById: async (id: string): Promise<Interview> => {
    const response = await api.get<Interview>(`/interviews/${id}`);
    return response.data;
  },
  
  // Create new interview
  createInterview: async (interviewData: Omit<Interview, '_id'>): Promise<Interview> => {
    const response = await api.post<Interview>('/interviews', interviewData);
    return response.data;
  },
  
  // Update interview
  updateInterview: async (id: string, interviewData: Partial<Interview>): Promise<Interview> => {
    const response = await api.put<Interview>(`/interviews/${id}`, interviewData);
    return response.data;
  },
  
  // Delete interview
  deleteInterview: async (id: string): Promise<void> => {
    await api.delete(`/interviews/${id}`);
  },
  
  // Get interviews by student
  getInterviewsByStudent: async (studentId: string): Promise<Interview[]> => {
    const response = await api.get<Interview[]>(`/interviews/student/${studentId}`);
    return response.data;
  },
  
  // Get interviews by company
  getInterviewsByCompany: async (companyId: string): Promise<Interview[]> => {
    const response = await api.get<Interview[]>(`/interviews/company/${companyId}`);
    return response.data;
  },
  
  // Get upcoming interviews
  getUpcomingInterviews: async (): Promise<Interview[]> => {
    const response = await api.get<Interview[]>('/interviews/upcoming');
    return response.data;
  },
  
  // Update interview result
  updateInterviewResult: async (
    id: string, 
    result: 'selected' | 'rejected' | 'pending', 
    feedback?: string
  ): Promise<Interview> => {
    const response = await api.put<Interview>(`/interviews/${id}/result`, { result, feedback });
    return response.data;
  },
};

export default interviewService;