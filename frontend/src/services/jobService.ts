import api from './api';
import { Job } from '../types';

// Service for job related API calls
const jobService = {
  // Get all jobs
  getAllJobs: async (): Promise<Job[]> => {
    const response = await api.get<Job[]>('/jobs');
    return response.data;
  },
  
  // Get job by ID
  getJobById: async (id: string): Promise<Job> => {
    const response = await api.get<Job>(`/jobs/${id}`);
    return response.data;
  },
  
  // Create new job
  createJob: async (jobData: Omit<Job, '_id' | 'createdAt'>): Promise<Job> => {
    const response = await api.post<Job>('/jobs', jobData);
    return response.data;
  },
  
  // Update job
  updateJob: async (id: string, jobData: Partial<Job>): Promise<Job> => {
    const response = await api.put<Job>(`/jobs/${id}`, jobData);
    return response.data;
  },
  
  // Delete job
  deleteJob: async (id: string): Promise<void> => {
    await api.delete(`/jobs/${id}`);
  },
  
  // Get jobs by company
  getJobsByCompany: async (companyId: string): Promise<Job[]> => {
    const response = await api.get<Job[]>(`/jobs/company/${companyId}`);
    return response.data;
  },
  
  // Get jobs by status
  getJobsByStatus: async (status: 'open' | 'closed'): Promise<Job[]> => {
    const response = await api.get<Job[]>(`/jobs/status/${status}`);
    return response.data;
  },
  
  // Apply for job
  applyForJob: async (jobId: string, studentId: string): Promise<void> => {
    await api.post(`/jobs/${jobId}/apply`, { studentId });
  },
};

export default jobService;