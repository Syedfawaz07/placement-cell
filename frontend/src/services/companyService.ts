import api from './api';
import { Company } from '../types';

// Service for company related API calls
const companyService = {
  // Get all companies
  getAllCompanies: async (): Promise<Company[]> => {
    const response = await api.get<Company[]>('/companies');
    return response.data;
  },
  
  // Get company by ID
  getCompanyById: async (id: string): Promise<Company> => {
    const response = await api.get<Company>(`/companies/${id}`);
    return response.data;
  },
  
  // Create new company
  createCompany: async (companyData: Omit<Company, '_id'>): Promise<Company> => {
    const response = await api.post<Company>('/companies', companyData);
    return response.data;
  },
  
  // Update company
  updateCompany: async (id: string, companyData: Partial<Company>): Promise<Company> => {
    const response = await api.put<Company>(`/companies/${id}`, companyData);
    return response.data;
  },
  
  // Delete company
  deleteCompany: async (id: string): Promise<void> => {
    await api.delete(`/companies/${id}`);
  },
  
  // Upload company logo
  uploadLogo: async (id: string, file: File): Promise<Company> => {
    const formData = new FormData();
    formData.append('logo', file);
    
    const response = await api.post<Company>(`/companies/${id}/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
};

export default companyService;