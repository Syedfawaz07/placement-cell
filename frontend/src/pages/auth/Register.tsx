import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, GraduationCap, Building } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Alert from '../../components/common/Alert';
import { useAuth } from '../../context/AuthContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    college: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.role === 'student' && { college: formData.college }),
      };
      
      await register(userData);
      setSuccess(true);
      
      // Redirect after short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      setError(
        error.response?.data?.message || 
        'An error occurred during registration. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'company', label: 'Company' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center">
            <GraduationCap size={36} className="text-blue-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
        
        {error && (
          <Alert variant="error">
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert variant="success">
            Registration successful! Redirecting to login...
          </Alert>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              label="Full name"
              leftIcon={<User size={18} />}
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="Email address"
              leftIcon={<Mail size={18} />}
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
            
            <Select
              id="role"
              name="role"
              label="Role"
              required
              options={roleOptions}
              value={formData.role}
              onChange={handleChange}
              fullWidth
            />
            
            {formData.role === 'student' && (
              <Input
                id="college"
                name="college"
                type="text"
                required
                label="College / University"
                leftIcon={<Building size={18} />}
                value={formData.college}
                onChange={handleChange}
                fullWidth
              />
            )}
            
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              label="Password"
              leftIcon={<Lock size={18} />}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              minLength={6}
            />
            
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              label="Confirm password"
              leftIcon={<Lock size={18} />}
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            size="lg"
          >
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;