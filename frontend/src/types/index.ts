export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'company';
  college?: string;
  createdAt: string;
}

export interface Student {
  _id: string;
  name: string;
  email: string;
  college: string;
  batch: string;
  status: 'placed' | 'not_placed';
  placementDetails?: {
    company: string;
    package: number;
    role: string;
  };
  resume?: string;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: number;
    percentage: number;
  }[];
}

export interface Company {
  _id: string;
  name: string;
  email: string;
  description: string;
  website: string;
  location: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  logo?: string;
}

export interface Job {
  _id: string;
  title: string;
  company: string | Company;
  description: string;
  requirements: string[];
  location: string;
  salary: string;
  positions: number;
  type: 'full-time' | 'part-time' | 'internship';
  status: 'open' | 'closed';
  deadline: string;
  createdAt: string;
}

export interface Interview {
  _id: string;
  student: string | Student;
  company: string | Company;
  job: string | Job;
  dateTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  feedback?: string;
  result?: 'selected' | 'rejected' | 'pending';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string>;
  status?: number;
}

export interface DashboardStats {
  totalStudents: number;
  totalCompanies: number;
  totalJobs: number;
  totalInterviews: number;
  placedStudents: number;
  placementRate: number;
  upcomingInterviews: number;
}