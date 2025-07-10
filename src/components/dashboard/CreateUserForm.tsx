import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { validateName, validateEmail, validateAddress, validatePassword } from '../../utils/validation';

interface CreateUserFormProps {
  onSubmit: (userData: any) => void;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'NORMAL_USER' as 'NORMAL_USER' | 'STORE_OWNER' | 'SYSTEM_ADMIN',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newErrors: { [key: string]: string } = {};
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const addressError = validateAddress(formData.address);
    if (addressError) newErrors.address = addressError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onSubmit(formData);
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        value={formData.name}
        onChange={(value) => handleChange('name', value)}
        error={errors.name}
        placeholder="Enter full name (20-60 characters)"
        required
      />
      
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => handleChange('email', value)}
        error={errors.email}
        placeholder="Enter email address"
        required
      />
      
      <Input
        label="Address"
        value={formData.address}
        onChange={(value) => handleChange('address', value)}
        error={errors.address}
        placeholder="Enter address (max 400 characters)"
        required
      />
      
      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={(value) => handleChange('password', value)}
        error={errors.password}
        placeholder="8-16 chars with uppercase & special character"
        required
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Role <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="NORMAL_USER">Normal User</option>
          <option value="STORE_OWNER">Store Owner</option>
          <option value="SYSTEM_ADMIN">System Admin</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Create User
        </Button>
      </div>
    </form>
  );
};