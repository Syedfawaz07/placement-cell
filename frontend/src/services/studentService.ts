import api from './api';
import { Student } from '../types';

// Service for student related API calls
const studentService = {
  // Get all students
  getAllStudents: async (): Promise<Student[]> => {
    const response = await api.get<Student[]>('/students');
    return response.data;
  },
  
  // Get student by ID
  getStudentById: async (id: string): Promise<Student> => {
    const response = await api.get<Student>(`/students/${id}`);
    return response.data;
  },
  
  // Create new student
  createStudent: async (studentData: Omit<Student, '_id' | 'createdAt'>): Promise<Student> => {
    const response = await api.post<Student>('/students', studentData);
    return response.data;
  },
  
  // Update student
  updateStudent: async (id: string, studentData: Partial<Student>): Promise<Student> => {
    const response = await api.put<Student>(`/students/${id}`, studentData);
    return response.data;
  },
  
  // Delete student
  deleteStudent: async (id: string): Promise<void> => {
    await api.delete(`/students/${id}`);
  },
  
  // Upload resume
  uploadResume: async (id: string, file: File): Promise<Student> => {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await api.post<Student>(`/students/${id}/resume`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
  
  // Get students by placement status
  getStudentsByStatus: async (status: 'placed' | 'not_placed'): Promise<Student[]> => {
    const response = await api.get<Student[]>(`/students/status/${status}`);
    return response.data;
  },
};

export default studentService;